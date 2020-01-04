const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
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
        saveUninitialized: true,
        store: new FileStore() //()안에는 옵션값이 들어감
    })
);

//-> session으로 만들어져서 메모리에 저장됨 -> 리로드될 때마다 메모리가 날라가서 새로시작됨
//-> 이를 방지하기 위해서 file이나 데이터베이스에 저장을 해야함
//-> file에 저장하기 위해서 사용하는 모듈 : session-file-store + store라는 옵션 사용
//-> 세션이 추가될때마다 폴더 session안에 같은 컴터로 접속하면 그것을 알 수 있는 session 객체가 생성됨

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
//-> session으로 만들어졌기때문에 서버가 리로드될 때마다 리셋됨

//login : get
app.get("/auth/login", function(req, res) {
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
app.post("/auth/login", function(req, res) {
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
        res.redirect("/welcome");
    } else {
        res.send('<h2>username or password is wrong! please check it</h2><a href="/auth/login"/>Back');
    }
});

app.get("/auth/logout", function(req, res) {
    delete req.session.displayName;
    // req.session.destroy(function (err) {
    //     // cannot access session here
    // });
    res.redirect("/welcome");
});

//welcome page
app.get("/welcome", function(req, res) {
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
