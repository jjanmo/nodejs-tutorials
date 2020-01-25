//기본적인 session기능을 구현한 app
// + password sercurity 기능 추가 : md5사용

const express = require("express");
const session = require("express-session");
//express에는 session기능이 없음 -> express에서 session에 대한 구체적인 기능을 하는 것이 express-session
const md5 = require("md5"); //암호화 모듈 : 현재는 사용하지 않음
//-> 암호화만 가능(원래문자 -> 암호화된문자 가능) , 복호화는 불가(암호화된 문자 -> 원래문자 불가능) : 단방향암호화방법
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.listen(port, function() {
    console.log(`App listening on port ${port}`);
});

//body-parser 사용 준비 완료
app.use(bodyParser.urlencoded({ extended: false }));

//session을 사용할 준비 완료!!
app.use(
    session({
        secret: "asdfasdfasf@#$%safdsfa",
        resave: false,
        saveUninitialized: true
    })
);

/*
참고:설명추가
express-session을 사용하면 req.session 이라는 객체가 생성
해당하는 객체에 property(여기선 count)를 할당함으로써 세션에 값을 줌
*/

//counter using session
app.get("/count", function(req, res) {
    console.log(req.session.count);
    req.session.count = req.session.count ? req.session.count + 1 : 1;
    res.send(`count : ${req.session.count}`);
});
//-> session으로 만들어져서 메모리에 저장됨 -> 리로드될 때마다 메모리가 날라가서 새로시작됨
//-> 이를 방지하기 위해서 file이나 데이터베이스에 저장을 해야함
//-> file에 저장하는 것 : app_session_file.js 로!!

//db를 사용하지 않기 때문에 배열안에 user의 정보를 저장해서 사용할 것임!
//이렇게 user정보를 이렇게 사용하면 app 리로딩 될 때마다 새롭게 생성
const usersInfo = [
    {
        username: "jjanmo",
        password: "81dc9bdb52d04dc20036dbd8313ed055",
        nickname: "JJANMO"
    }
];

//login : get
app.get("/auth/login", function(req, res) {
    const loginPage = `
        <h1>LOGIN</h1>
        <form action="/auth/login" method="post">
            <p>
                <input type="text" name="username" placeholder="Enter the name"/>              
            
            </p>
            <p>
                <input type="password" name="password" placeholder="Enter the password"/>              
            
            </p>
            <input type="submit">
        </form>
        `;
    res.send(loginPage);
});

//login : post
app.post("/auth/login", function(req, res) {
    const username = req.body.username;
    const password = md5(req.body.password);
    usersInfo.forEach(user => {
        if (user.username === username && user.password === password) {
            req.session.username = username;
            return req.session.save(function() {
                res.redirect("/welcome");
            });
        } else
            return res.send(`
                      <h3>username or password is wrong! Please check and log in again</h3>
                      <a href="/auth/login"/>Back  
            `);
    });
});

app.get("/auth/logout", function(req, res) {
    delete req.session.username;
    // req.session.destroy(function (err) {
    //     // cannot access session here
    // });
    res.redirect("/welcome");
});

//welcome page
app.get("/welcome", function(req, res) {
    const username = req.session.username;
    if (username) {
        res.send(`
                <h2>Hello ${username}!!</h2>
                <p>
                    <a href="/auth/logout"/>LOGOUT
                </p>
                `);
    } else {
        res.send(`
                <h2>WELCOME</h2>
                <div>
                    <a href="/auth/login"/>LOGIN
                </div>
                <div>
                    <a href="/auth/register"/>REGISTER
                </div> 
        `);
    }
});

//register
app.get("/auth/register", function(req, res) {
    res.send(`
            <h3>REGISTER</h3>
            <form action="/auth/register" method="post">
                <p>
                    <input type="text" name="username" placeholder="Enter your name" />
                </p>
                <p>
                    <input type="password" name="password" placeholder="Enter your password" />
                </p>
                <p>
                    <input type="text" name="nickname" placeholder="Enter your nickname" />
                </p>
                <p>
                    <input type="submit" value="SUBMIT" />
                </p>
            </form>
    `);
});

app.post("/auth/register", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const nickname = req.body.nickname;

    //사용자 정보를 추가할 때 이미있는 사용자인지를 확인할 필요가 있음
    usersInfo.forEach(user => {
        if (username === user.username) {
            return res.send(`
                    <h3 style="color:red;">This username isn't allowed. Try again.</h3>
                    <a href="/auth/register"/>REGISTER     
            `);
        } else if (nickname === user.nickname) {
            return res.send(`
                <h3 style="color:red;">This nickname isn't allowed. Try again.</h3>
                <a href="/auth/register"/>REGISTER     
            `);
        } else {
            const userObj = {
                username,
                password,
                nickname
            };
            usersInfo.push(userObj);
            //session 생성
            req.session.username = username;
            return req.session.save(function() {
                res.redirect("/welcome");
            });
        }
    });
});
