//session을 database mysql에 저장하는 기능을 추가한 app

const express = require("express");
const session = require("express-session");
//express에는 session기능이 없음 -> express에서 session에 대한 구체적인 기능을 하는 것이 express-session
const MySQLStore = require('express-mysql-session')(session);

const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});

//session을 어디에 저장할지에 대한 정보 등록 : mysql
//-> 만약에 mysql을 정보저장을 위해서 사용하고 또한 session저장을 위해서 사용한다면 2가지 모두 등록해야함
const sessionStore = new MySQLStore({
    //options 정보
    host: 'localhost',
    port: 3306,
    user: 'jjanmo',
    password: 'jjanmo',
    database: 'o2'
});

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

//-> 이렇게 설정하면 database 'o2'에 sessions라는 테이블이 생기고 그곳에 session정보가 저장됨

/*
참고:설명추가
express-session을 사용하면 req.session 이라는 객체가 생성
해당하는 객체에 property를 할당함으로써 세션에 값을 줌
*/

//body-parser 사용 준비 완료
app.use(bodyParser.urlencoded({ extended: false }));

//login : get
app.get("/auth/login", function (req, res) {
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
app.post("/auth/login", function (req, res) {
    //This data is located here, to reduce complexity of a our app.(in fact in database)
    const user = {
        name: "jjanmo", //로그인 할때 사용하는 유저아이디
        password: "1234",
        displayName: "JJANMO" //로그인하면 화면에 보이는 유저아이디
    };
    const userName = req.body.userName;
    const password = req.body.password;
    if (user.name === userName && user.password === password) {
        // res.send('<h2>welcome!</h2>')
        req.session.displayName = user.displayName;
        //session에 display라는 프로퍼티로 값을 줌 : 프로퍼티이름은 어디서나 같은 걸로 접근해야함

        req.session.save(function () {
            res.redirect("/welcome")
        })
    } else {
        res.send('<h2>username or password is wrong! please check it</h2><a href="/auth/login"/>Back');
    }
});

app.get("/auth/logout", function (req, res) {
    delete req.session.displayName;
    // req.session.destroy(function (err) {
    //     // cannot access session here
    // });
    // res.redirect("/welcome");

    //좀 더 안전한 redirection을 위한 작업)(아래) : database에 session을 저장하고 난 후에 콜백함수를 실행
    //-> database에 반영이 안된채로 redirect되는 경우를 막을 수 있음
    //-> redirect하는 경우에 사용할 수 있는 방법
    req.session.save(function () {
        res.redirect("/welcome");
    });

});

//welcome page
app.get("/welcome", function (req, res) {
    const displayName = req.session.displayName;
    if (displayName) {
        res.send(`
                <h2>Hello ${displayName}!!</h2>
                <p>
                    <a href="/auth/logout"/>LOGOUT
                </p>
                `);
    } else {
        res.send(`
                <h2>WELCOME</h2>
                <h3>Please login first <a href="/auth/login"/>LOGIN<h3>
        `);
    }
});
