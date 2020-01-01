const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;
app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});

//session을 사용할 준비 완료!!
app.use(session({
    secret: 'asdfasdfasf@#$%safdsfa',
    resave: false,
    saveUninitialized: true,
}));


app.get('/count', function (req, res) {
    console.log(req.session.count);
    req.session.count = req.session.count ? req.session.count + 1 : 1;
    res.send(`count : ${req.session.count}`);
});
//session으로 만들어졌기때문에 서버가 리로드될 때마다 리셋됨
