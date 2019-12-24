const express = require('express'); //import express
const app = express();              //use express
const port = 3000;
app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});

//template engine을 사용하기 위한 코드
app.set('view engine', 'pug');
app.set('views', './views');

//post방식의 정보를 받기위한 코드(body를 이용하기위한)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/topic/new', function (req, res) {
    res.render('new');
});

app.post('/form', function (req, res) {
    const title = req.body.title;
    const description = req.body.description;
    res.send(title + ',' + description);
});