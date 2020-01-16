//구현 목표 : data를 file에 저장하여 CRUD 구현
const express = require("express"); //import module express
const fs = require("fs");           //import module file system

const app = express(); //use express
const port = 3000;
app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});

//template engine을 사용하기 위한 코드
app.set("view engine", "pug");
app.set("views", "./views_file");
app.locals.pretty = true; //pug파일에서 만든 html이 웹상에서 예쁘게 보이도록 하는 설정

//post방식의 정보를 받기위한 코드(body를 이용하기 위한)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//입력창
app.get("/topic/add", function (req, res) {
    fs.readdir("./data", function (err, files) {
        if (err) res.status(500).send("Internal Server Error");
        res.render("add", { topics: files });
    });
});

//데이터 추가 : post
app.post("/add", function (req, res) {
    //form을 통해서 받은 title과 description을 파일에 저장
    const title = decodeURIComponent(req.body.title);
    const description = req.body.description;
    fs.writeFile(`./data/${title}`, description, function (err) {
        if (err) {
            res.status(500).send("Internal Server Error");
        }
        console.log("The file has been saved!");
    });
    //res.send("Success");
    //redirect
    res.redirect(`/topic/${title}`);
});

//수정창
app.get("/topic/:id/edit", function (req, res) {
    const id = req.params.id;
    fs.readdir('./data', function (err, files) {
        if (err) res.status(500).send('Internal Server Error');
        fs.readFile(`./data/${id}`, function (err, data) {
            if (err) throw err;
            res.render('edit', { topics: files, title: id, description: data });
        });
    });
});

//수정 : post
app.post("/topic/:id/edit", function (req, res) {
    const id = req.params.id;
    const title = decodeURIComponent(req.body.title);
    const description = req.body.description;
    fs.rename(`./data/${id}`, `./data/${title}`, (err) => {
        fs.writeFile(`./data/${title}`, description, (err) => {
            res.redirect(`/topic/${title}`);
        });
    });
})

//목록 or 내용 표시
app.get(["/topic", "/topic/:id"], function (req, res) {
    fs.readdir("./data", function (err, files) {
        if (err) res.status(500).send("Internal Server Error");
        const id = req.params.id;
        if (id) {
            fs.readFile(`data/${id}`, "utf-8", function (err, data) {
                if (err) res.status(500).send("Internal Server Error");

                res.render("view", { topics: files, flag: true, title: id, description: data });
                // res.send(data);
            });
        } else {
            res.render("view", { topics: files, flag: false, title: "This is TITLE", description: "DESCRIPTION" });
        }
    });
});


//삭제창
app.get('/topic/:id/delete', function (req, res) {
    const id = req.params.id;
    fs.readdir('./data', function (err, files) {
        if (err) res.status(500).send("Internal Server Error");
        fs.readFile(`./data/${id}`, 'utf-8', function (err, data) {
            if (err) res.status(500).send("Internal Server Error");
            res.render("delete", { topics: files, title: id, description: data });
        });
    });
});

//삭제 : post
app.post('/topic/:id/delete', function (req, res) {
    const id = req.params.id;
    // console.log(id);
    fs.unlink(`./data/${id}`, (err) => {
        if (err) throw err;
        console.log(`file ${id} was deleted`);
    });
    res.redirect('/topic');
})