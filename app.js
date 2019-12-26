const express = require("express"); //import module express
const fs = require("fs"); //import module file system
const app = express(); //use express
const port = 3000;
app.listen(port, function() {
    console.log(`App listening on port ${port}`);
});

//template engine을 사용하기 위한 코드
app.set("view engine", "pug");
app.set("views", "./views");
app.locals.pretty = true; //pug파일에서 만든 html이 웹상에서 예쁘게 보이도록 하는 설정

//post방식의 정보를 받기위한 코드(body를 이용하기위한)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//이 라우터를 밑으로 옮기면 에러발생 : 아마도 /topic/:id 와 /topic/new를 정확하게 구분하지못해서 생기는 에러인듯..
app.get("/topic/new", function(req, res) {
    fs.readdir("./data", function(err, files) {
        if (err) res.status(500).send("Internal Server Error");
        res.render("new", { topics: files });
    });
});

//목록표시 : 데이터가 저장되면 그 저장된 정보로 리스트를 생성하는 것:
app.get(["/topic", "/topic/:id"], function(req, res) {
    fs.readdir("./data", function(err, files) {
        if (err) res.status(500).send("Internal Server Error");
        const id = req.params.id;
        if (id) {
            fs.readFile(`data/${id}`, "utf-8", function(err, data) {
                if (err) res.status(500).send("Internal Server Error");

                res.render("view", { topics: files, title: id, description: data });
                // res.send(data);
            });
        } else {
            res.render("view", { topics: files, title: "This is TITLE", description: "DESCRIPTION" });
        }
    });
});

// //내용표시
// app.get("/topic/:id", function(req, res) {
//     const id = req.params.id;
//     fs.readdir("./data", function(err, files) {
//         if (err) res.status(500).send("Internal Server Error");

//         fs.readFile(`data/${id}`, "utf-8", function(err, data) {
//             if (err) res.status(500).send("Internal Server Error");

//             res.render("view", { topics: files, title: id, description: data });
//             // res.send(data);
//         });
//     });
// });

app.post("/form", function(req, res) {
    //form을 통해서 받은 title과 description을 파일에 저장
    const title = req.body.title;
    const description = req.body.description;
    fs.writeFile(`./data/${title}`, description, function(err) {
        if (err) {
            res.status(500).send("Internal Server Error");
        }
        console.log("The file has been saved!");
    });
    //res.send("Success");
    //redirect
    res.redirect(`/topic/${title}`);
});
