const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const ejs = require('ejs'); //embedded javascript
const app = express();
const port = 3000;
app.listen(port, () => console.log(`start!!! listen on the port ${port}`));

//static file(css, js) 설정
app.use(express.static('public'));
//bodyparser 등록
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//이제 express에 bodyparser일부 기능이 빌트인되었음, bodyparser를 임포트하지않아도 사용가능
//-> app.use(express.json());
//-> app.use(express.urlencoded({extened:false}));

app.set('view engine', 'ejs');

//exmaple1
app.get(['/', '/main'], function (req, res) {
    res.sendFile(__dirname + '/public/main.html');
});

app.post('/sendUserInfo', function (req, res) {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userPhone = req.body.userPhone;

    res.render('userinfo', {
        userName: userName,
        userEmail: userEmail,
        userPhone: userPhone,
    });
});

//exmaple2
app.get('/sendAjax', function (req, res) {
    res.sendFile(__dirname + '/public/sendAjax.html');
});

app.post('/sendAjax', function (req, res) {
    console.log(req.body);
    const responseData = {
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPhone: req.body.userPhone,
    };
    res.json(responseData);
});

//exmaple3
app.get('/search', function (req, res) {
    res.sendFile(__dirname + '/public/search.html');
});

app.post('/search', function (req, res) {
    const keyword = req.body.keyword;
    //data
    const movieData = JSON.parse(fs.readFileSync('./data/movie.txt', 'utf8'));
    const movieList = movieData.movies; //array
    const searchedMovie = movieList.filter((ele) => {
        return ele.moviename.toLowerCase().includes(keyword.toLowerCase());
    });

    res.json(searchedMovie);
});
