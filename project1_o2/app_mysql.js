//구현 목표 : mysql을 이용하여서 simple board를 구현하기

const express = require("express"); //import module express
const mysql = require('mysql');     //import mysql

const app = express(); //use express
const port = 3000;
app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});

//template engine을 사용하기 위한 코드
app.set("view engine", "pug");
app.set("views", "./views_mysql");
app.locals.pretty = true; //pug파일에서 만든 html이 웹상에서 예쁘게 보이도록 하는 설정

//post방식의 정보를 받기위한 코드(body를 이용하기 위한)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//app이 접속할 db의 정보를 입력 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'jjanmo',
    password: 'jjanmo',
    database: 'o2'
});
//database 연결
connection.connect();

// connection.query('select * from topic', function (error, results, fields) {
//     if (error) {
//         console.log(error);
//     }
//     console.log(results, fields);
// });

// connection.end();

//입력창
app.get("/topic/add", function (req, res) {
    const sql = 'select  title, id from topic';
    connection.query(sql, function (error, topics, fields) {
        if (error) console.log(error);
        res.render('add', { topics: topics });
    })
});

//데이터 추가 : post
app.post("/topic/add", function (req, res) {
    //form을 통해서 받은 title과 description을 파일에 저장
    const title = req.body.title;
    const description = req.body.description;
    const author = req.body.author;
    console.log(title, description, author);
    const sql = 'insert into topic (title, description) values (?,?)';
    const params = [title, description];
    connection.query(sql, params, function (error, topic, fields) {

        //author
        const sql1 = 'select EXISTS (select * from author where name=?) as success';
        connection.query(sql1, [author], function (error, results, fields) {
            const existName = results[0].success; //
            if (existName) {
                //author가 존재할 때, 존재하는 아이디 값을 author_id에 넣어줘야함
                const updateQuery1 = 'update topic set author_id = (select id from author where name=(?)) where id = (?)';
                connection.query(updateQuery1, [author, topic.insertId], function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                    console.log('author_id is updated');
                });
            }
            else {
                //author가 존재하지않을 때, id를 생성해주고 그 값을 topic에 채워줘야함
                const insertAuthor = 'insert into author (name) values (?)';
                connection.query(insertAuthor, [author], function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                    console.log('author name is saved');
                    const updateQuery2 = 'update topic set author_id = (?) where id = (?)';
                    connection.query(updateQuery2, [results.insertId, topic.insertId], function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                        console.log('author_id is updated');
                    })
                });
            }
        });
        res.redirect(`/topic/${topic.insertId}`);
    });
});

//목록 or 내용 표시
app.get(["/topic", "/topic/:id"], function (req, res) {
    connection.query('select title, id from topic', function (error, topics, fields) {
        if (error) {
            console.log(error);
        }
        const id = req.params.id;
        if (id) {
            const sql = `select topic.title, topic.description, topic.id, author.name from topic 
                        left outer join author on topic.author_id = author.id where topic.id=?`;
            const params = [id];
            connection.query(sql, params, function (error, topic, fields) {
                if (error) {
                    console.log(error);
                }
                console.log(topic);
                res.render('view', { topics: topics, topic: topic[0] })
            });
        }
        else {
            res.render('view', { topics: topics });
        }
    });
    // connection.end();
    //-> 이코드를 사용하면 error발생 ? why?
});

//수정창
app.get("/topic/:id/edit", function (req, res) {
    const id = req.params.id;
    const sql = 'select title,description,id from topic where id=?';
    const params = [id];
    connection.query(sql, params, function (error, topic, fields) {
        if (error) {
            console.log(error);
        }
        res.render('edit', { topic: topic[0] });
    });
});

//수정 : post
app.post("/topic/:id/edit", function (req, res) {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const sql = 'update topic set title=?, description=? where id=?';
    const params = [title, description, id];
    connection.query(sql, params, function (error, results, fields) {
        res.redirect(`/topic/${id}`);
    });
})

//삭제창
app.get('/topic/:id/delete', function (req, res) {
    const id = req.params.id;
    const sql1 = 'select title, id from topic';
    connection.query(sql1, function (error, topics, fields) {
        if (error) throw error;
        const sql2 = 'select title,description,id from topic where id=?';
        const params = [id];
        connection.query(sql2, params, function (error, topic, fields) {
            res.render('delete', { topics: topics, topic: topic[0] });
        });
    });
});

//삭제 : post
app.post('/topic/:id/delete', function (req, res) {
    const id = req.params.id;
    const sql = 'delete from topic where id=?';
    const params = [id];
    connection.query(sql, params, function (error, results, fields) {
        res.redirect('/topic');
    });
})