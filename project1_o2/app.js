const express = require("express"); //import module express
const fs = require("fs"); //import module file system
const multer = require("multer"); //import module multer(upload middleware)

//만약에 내가 업로드한 파일의 이름등을 커스터마이징하고 싶다면,,
var _storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads");
        //-> 이곳에 추가적인 코드를 넣어서 원하는대로 커스터마이징 할 수 있음
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: _storage }); //dest(destination) 경로설정
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

//upload form router
app.get("/upload", function(req, res) {
    res.render("upload");
});

//upload file
app.post("/upload", upload.single("userFile"), function(req, res) {
    //upload.single('userFile') (= middleware의 역할) : 뒤의 function이 실행되기 전에 먼저 실행되어서 전송된 정보에 파일이 포함되어있으면,
    //request 객체에 file property를 추가시켜줌 -> file에 대한 정보를 갖게 됨
    //console.log(req.file); //파일정보
    res.send("uploaded : " + req.file.originalname);
});

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
