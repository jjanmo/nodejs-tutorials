//기본적인 session기능을 구현한 app
// + password sercurity 기능 추가 : md5사용 / sha256
// + pbfdk2-password 

const express = require("express");
const session = require("express-session");
//express에는 session기능이 없음 -> express에서 session에 대한 구체적인 기능을 하는 것이 express-session

//const md5 = require("md5"); //암호화 모듈 : 현재는 사용하지 않음
//-> 암호화만 가능(원래문자 -> 암호화된문자 가능) , 복호화는 불가(암호화된 문자 -> 원래문자 불가능) : 단방향암호화방법
//-> 설계상의 문제로 인해 더이상 암호화로 사용되지않음 대신 sha256 사용

//const sha256 = require("sha256");

//pbkdf2-password module
const pbkdf2 = require("pbkdf2-password");
const hasher = pbkdf2();

const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.listen(port, function () {
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
app.get("/count", function (req, res) {
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
        name: "jjanmo",
        //password: "452ac38f86be463d5cfdd587718d2457", //이런 값을 해쉬값이라고 함, md5를 이용한 것
        //password: "caf50c75a1ad90ee6be325fb9e1841eb5a59361a966dec0fa5fb3910dc9ca6cc", //sha256을 이용, 위보다 훨씬 복잡해진 암호화
        //salt: "#$%asdasd",

        //->pbkdf2-password 사용
        password:
            "ocoGcBrphxsaPF4y16zt/CUyXw15CN/CJhyVyAqe4cCfC3FaGmZ6q3NfTaDNJZgYiIGnCX1fxN/1snrw4uvS4Mtr/vVsAuSu2heFnhsdm2/A4iZEg1t5pYQ/Yr/wfKEw+S3Rv9z6lCf3xownOvImv4PitPuqvoU2usg8uas66xk=",
        salt: "1xZtA/NCDSGKx/MOECNekniO8s5fDvAnWWmE0IN9AKniPwuoMpFB/5c3+gMVQ4Xxk2lbqPG/0Qt/CWskLs93vA==",

        nickname: "JJANMO"
    },
    {
        name: "node",
        //password: "0a197cd237c6b6b2098c32646da8693e", //password가 같음 '1234' 하지만 salt값에 의해 암호화했을때 달라짐,  md5를 이용한 것
        //password: "e3729e883a8a0e0ac809ec995219c788b5d573960f17f11badaacc4a47b7ee41", //sha256을 이용, 위보다 훨씬 복잡해진 암호화
        //salt: "#$%!@#qwe",

        //-> pbkdf2-password 사용
        password:
            "bpZ8WI8lqMs855zrnHwf4ReEhXEbBJ1/Q5GFbwwrqNoamLlw9oUru/FsuIr3IMPZivYpmavD2WbqrJVRLcMyqYVpJJyUn+rnTtbd6EJI/FtBQUnPNg5sBlKY0wi131dww+z5r7fjut+VIVFfQLwSup6+O3P8XkdN+Ot1KVniDp4=",
        salt: "9WLuNmQrhUFFn8Wn69jyW0RYIPFLSMOCtRNtbROSPdWUF4t+OaNgAEHv4POe6U8fQN+lTQthXDcqUjXf3yyL5g==",

        nickname: "NODE"
    }
];

/*
해싱한 비밀번호의 문제점
-문제점1
단순 해싱한 비밀번호는 뚫릴 여지가 많다. 왜냐하면 수많은 누적된 암호화 자료를 통해서 이를 통계내면
매우 어려운 복잡도를 가진 비밀번호가 아니고서야 알아낼 수 있다(실제로 그런 사이트 존재)
-> 이럴 경우를 보안하기 위해서 "비밀번호를 해싱하고 소금을 친다(add salt)"고 한다.
-> 비밀번호 + salt
※salt의 유래
요리에서 기본양념으로 소금을 치는 것처럼 원문에 소금을 더해서 다른 암호문을 만든다는 의미에서 유래

-문제점2
같은 비밀번호를 가진 유저가 있다고 가정하자.
한사람의 비밀번호가 뚫릴 경우, 다른 사람의 비밀번호도 뚫리게 된다.
-> 각각의 비밀번호에 각각 다른 salt값을 줌에 따라서 비밀번호는 같지만 서로 다른 해쉬값을 갖게된다.

참고사이트
https://starplatina.tistory.com/entry/%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8-%ED%95%B4%EC%8B%9C%EC%97%90-%EC%86%8C%EA%B8%88%EC%B9%98%EA%B8%B0-%EB%B0%94%EB%A5%B4%EA%B2%8C-%EC%93%B0%EA%B8%B0
*/

//login : get
app.get("/auth/login", function (req, res) {
    const loginPage = `
        <h1>LOGIN</h1>
        <form action="/auth/login" method="post">
            <p>
                <input type="text" name="name" placeholder="Enter the name"/>              
            
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
app.post("/auth/login", function (req, res) {
    const name = req.body.name;
    const password = req.body.password;

    // 더 생각해볼 코드뭉치!!
    // usersInfo.forEach(user => {
    //     if (user.name === name && user.password === md5(password)) {
    //         req.session.username = username;
    //         return req.session.save(function() {
    //             res.redirect("/welcome");
    //         });
    //     }
    // });
    //-> 위 코드 error : Cannot set headers after they are sent to the client
    //-> res.redirect("/welcome");가 1번이상 보내짐
    //-> 위에서 return을 한다고해서 forEach()를 빠져나오는 것이 아니라 콜백함수만 빠져나오고 다시 forEach()를 순회하는 것 같다.
    //-> 아직 정확하고 확실하게 원인파악은 안됨. 원인을 논리적으로 추측(?)한 결과임...

    for (let user of usersInfo) {
        if (user.name === name) {
            return hasher({ password: password, salt: user.salt }, function (err, pass, salt, hash) {
                if (user.password === hash) {
                    req.session.username = name;
                    req.session.save(function () {
                        res.redirect("/welcome");
                    });
                } else {
                    res.send(`
                        <h3>username or password is wrong! Please check and log in again</h3>
                        <a href="/auth/login"/>Back
                    `);
                }
            });
        }
    }
    res.send(`
        <h3>username or password is wrong! Please check and log in again</h3>
        <a href="/auth/login"/>Back
    `);
});

app.get("/auth/logout", function (req, res) {
    delete req.session.username;
    // req.session.destroy(function (err) {
    //     // cannot access session here
    // });
    res.redirect("/welcome");
});

//welcome page
app.get("/welcome", function (req, res) {
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
app.get("/auth/register", function (req, res) {
    res.send(`
            <h3>REGISTER</h3>
            <form action="/auth/register" method="post">
                <p>
                    <input type="text" name="name" placeholder="Enter your name" />
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

app.post("/auth/register", function (req, res) {
    const name = req.body.name;
    const password = req.body.password;
    const nickname = req.body.nickname;

    //사용자 정보를 추가할 때 이미있는 사용자인지를 확인할 필요가 있음
    for (let user of usersInfo) {
        //->이 곳을 forEach()로 돌릴경우 위(login)에서 발생했던 에러와 같은 에러발생
        if (name === user.name) {
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
            return hasher({ password: password }, function (err, pass, salt, hash) {
                const userObj = {
                    name: name,
                    password: hash,
                    salt: salt,
                    nickname: nickname
                };
                usersInfo.push(userObj);
                console.log(usersInfo);
                //session 생성
                req.session.username = name;
                req.session.save(function () {
                    res.redirect("/welcome");
                });
            });
        }
    }
});
