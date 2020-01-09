const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.listen(port, () => console.log(`start!!! listen on the port ${port}`));

//project1에서는 supervisor를 설치하였음
//project2에서는 이와 같은 기능을 하는 nodemon을 설치함
//-> app에서의 코드변화를 감지하여 자동으로 서버를 재부팅해주는 기능을 함
//-> nodemon js파일명

//static file(css, js) 설정 
app.use(express.static('public'));
//bodyparser 등록
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//url routing 
app.get(['/', '/main'], function (req, res) {
    // res.send('hello world');
    res.sendFile(__dirname + "/public/main.html");
    //__dirname : 프로젝트가 있는 path를 말함
});

app.post('/sendUserInfo', function (req, res) {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userPhone = req.body.userPhone;
    res.send(`${userName}, ${userEmail}, ${userPhone}`);
});