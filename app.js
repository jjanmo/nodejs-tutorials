const express = require('express'); //import module express
const fs = require('fs');           //import module file system
const app = express();              //use express
const port = 3000;
app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});

//template engine을 사용하기 위한 코드
app.set('view engine', 'pug');
app.set('views', './views');
app.locals.pretty = true; //pug파일에서 만든 html이 웹상에서 예쁘게 보이도록 하는 설정

//post방식의 정보를 받기위한 코드(body를 이용하기위한)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/topic/new', function (req, res) {
    res.render('new');
});

app.post('/form', function (req, res) {
    //form을 통해서 받은 title과 description을 파일에 저장
    const title = req.body.title;
    const description = req.body.description;
    fs.writeFile(`./data/${title}.txt`, description, function (err) {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        console.log('The file has been saved!');
    });
    res.send('Success');
});