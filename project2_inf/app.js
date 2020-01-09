const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs'); //embedded javascript
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
//이제 express에 bodyparser일부 기능이 빌트인되었음, bodyparser를 임포트하지않아도 사용가능
//-> app.use(express.json()); 
//-> app.use(express.urlencoded({extened:false}));

//ejs 등록
app.set('view engine', 'ejs');

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
    // res.send(`${userName}, ${userEmail}, ${userPhone}`);
    res.render('userinfo', {
        userName: userName,
        userEmail: userEmail,
        userPhone: userPhone
    });
    //전달받은 변수값과 HTML을 합쳐서 클라이언트쪽에 보여주기 위해서 ejs를 이용함
});

//ajax 이용
app.get('/sendAjax', function (req, res) {
    res.sendFile(__dirname + '/public/sendAjax.html');
});

app.post('/sendAjax', function (req, res) {
    console.log(req.body.userInfo);
    const responseData = { data: req.body.userInfo };
    console.log(responseData);
    res.json(responseData);
});