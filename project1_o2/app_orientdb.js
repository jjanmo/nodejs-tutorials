const express = require("express"); //import module express
const fs = require("fs"); //import module file system
const multer = require("multer"); //import module multer(upload middleware)

//만약에 내가 업로드한 파일의 이름등을 커스터마이징하고 싶다면,,
var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
        //-> 이곳에 추가적인 코드를 넣어서 원하는대로 커스터마이징 할 수 있음
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

//orientdb
var OrientDB = require('orientjs');

var server = OrientDB({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: 'jjanmo'
});

var db = server.use('o2');


const upload = multer({ storage: _storage }); //dest(destination) 경로설정
const app = express(); //use express
const port = 3000;
app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});

//template engine을 사용하기 위한 코드
app.set("view engine", "pug");
app.set("views", "./views_orientdb");
app.locals.pretty = true; //pug파일에서 만든 html이 웹상에서 예쁘게 보이도록 하는 설정

//post방식의 정보를 받기위한 코드(body를 이용하기위한)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//upload form router
app.get("/upload", function (req, res) {
    res.render("upload");
});

//upload file
app.post("/upload", upload.single("userFile"), function (req, res) {
    //upload.single('userFile') (= middleware의 역할) : 뒤의 function이 실행되기 전에 먼저 실행되어서 전송된 정보에 파일이 포함되어있으면,
    //request 객체에 file property를 추가시켜줌 -> file에 대한 정보를 갖게 됨
    //console.log(req.file); //파일정보
    res.send("uploaded : " + req.file.originalname);
});

//add : 라우터의 순서가 중요 : /topic/:id와 /topic/add는 같은 형식의 라우터이다
app.get("/topic/add", function (req, res) {
    const sql = 'select * from topic';
    db.query(sql).then(function (topics) {
        res.render("add", { topics: topics });
    });
});

//add post : form
app.post("/form", function (req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const author = req.body.author;
    const sql = 'insert into topic (title, description, author) values(:title, :description, :author)';
    db.query(sql, {
        params: {
            title: title,
            description: description,
            author: author
        }
    }).then(function (topic) {
        const rid = encodeURIComponent(topic[0]['@rid']);
        res.redirect(`/topic/${rid}`);
    });
});

//edit get
app.get("/topic/:id/edit", function (req, res) {
    const sql1 = 'select * from topic';
    const id = req.params.id;
    db.query(sql1).then(function (topics) {
        const sql2 = 'select * from topic where @rid=:rid'
        db.query(sql2, {
            params: {
                rid: id
            }
        }).then(function (topic) {

            res.render("edit", { topics: topics, topic: topic[0] });

        });
    });
});

//edit post : form
app.post("/topic/:id/edit", function (req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const author = req.body.author;
    const id = req.params.id;
    const sql = 'update topic set title=:title, description=:description, author=:author where @rid=:rid';
    db.query(sql, {
        params: {
            title: title,
            description: description,
            author: author,
            rid: id
        }
    }).then(function (topic) {
        const rid = encodeURIComponent(id);
        res.redirect(`/topic/${rid}`);
    });
});

//목록표시 : 데이터가 저장되면 그 저장된 정보로 리스트를 생성하는 것:
app.get(["/topic", "/topic/:id"], function (req, res) {
    const sql1 = 'select * from topic';
    db.query(sql1).then(function (topics) {  //목록표시
        const id = req.params.id;
        if (id) {
            const sql2 = 'select * from topic where @rid=:rid';
            db.query(sql2, { params: { rid: id } }).then(function (topic) { //내용표시
                res.render('view', { topics: topics, topic: topic[0] });
            })
        }
        else {
            res.render('view', { topics: topics });
        }
    });
});


