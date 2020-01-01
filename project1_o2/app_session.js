const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});

//body-parser 사용 준비 완료
app.use(bodyParser.urlencoded({ extended: false }))

//session을 사용할 준비 완료!!
app.use(session({
    secret: 'asdfasdfasf@#$%safdsfa',
    resave: false,
    saveUninitialized: true,
}));

//counter using session
app.get('/count', function (req, res) {
    console.log(req.session.count);
    req.session.count = req.session.count ? req.session.count + 1 : 1;
    res.send(`count : ${req.session.count}`);
});
//-> session으로 만들어졌기때문에 서버가 리로드될 때마다 리셋됨


//login : get
app.get('/auth/login', function (req, res) {
    const loginPage = `
        <h1>LOGIN</h1>
        <form action="/auth/login" method="post">
        <p>
            <input type="text" name="userName" placeholder="enter the name"/>              
        
        </p>
        <p>
            <input type="password" name="password" placeholder="enter the password"/>              
        
        </p>
        <input type="submit">
        `;

    res.send(loginPage);
});


//login : post
app.post('/auth/login', function (req, res) {
    //This data is located here, to reduce complexity of a our app.(in fact in database)
    const user = {
        name: 'jjanmo',
        password: '1234'
    }

    const userName = req.body.userName;
    const password = req.body.password;
    if (user.name === userName && user.password === password) {
        res.send('<h2>welcome!</h2>')
        // res.redirect('/welcome');
    }
    else {
        res.send('<h2>username or password is wrong! please check it</h2><a href="/auth/login"/>Back');
    }

});
