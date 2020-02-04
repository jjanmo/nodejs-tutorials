//passport.js를 이용한 authentication(인증) 기능 구현
//cf. federation authentication(연합/타사 인증) 기능은 구현하지않음

const express = require("express");
const session = require("express-session");
//express에는 session기능이 없음 -> express에서 session에 대한 구체적인 기능을 하는 것이 express-session

//pbkdf2-password module
const pbkdf2 = require("pbkdf2-password");
const hasher = pbkdf2();

const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});

//import passport 
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
/*
passport에서 인증 기능을 구현하기 위해선 전략(strategy)을 선택해야함
그 전략이라 함은, 
구글,페이스북 등의 타사인증을 할 것인지 
혹은 자체적인 인증 시스템을 이용할 것인지를 선택하는 것!
각각의 전략에 맞는 module을 npm으로 설치해줘야함 
-> 여기선 local strategy를 선택함!
*/


//body-parser 사용 준비 완료
app.use(bodyParser.urlencoded({ extended: false }));

//session을 사용할 준비 완료!!(session설정)
app.use(
    session({
        secret: "asdfasdfasf@#$%safdsfa",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
        //🚩주의!! secure가 true로 되어있으면 passport session설정에서 문제가 생기는 경우가 있음
        //-> passport session저장에 있어서 세션을 식별하는 고유한 쿠키를 통해서 이루어지기때문에
        //secure : true로 하게되면 SSL통신(https protocol)에서만 쿠키를 사용할 수 있게 하는 옵션이기에 
        //현재 로컬에서 진행중인 프로젝트(http protocol)에선 passport session 설정에 오류가 있을수있음
        //cf. secure default value : false
    })
);

/*
참고:설명추가
express-session을 사용하면 req.session 이라는 객체가 생성
해당하는 객체에 property(여기선 count)를 할당함으로써 세션에 값을 줌
*/

app.use(passport.initialize()); //passport 초기화
app.use(passport.session());    //passport에서 session을 사용하겠다는 의미
//-> 이를 통해서 passport를 middleware로 등록함
//🚩주의!! express session 설정보다 반드시 아래 부분에 적어야함
//-> express-session 설정이 먼저 되어있어야함 


//db를 사용하지 않기 때문에 배열안에 user의 정보를 저장해서 사용할 것임!
//이렇게 user정보를 이렇게 사용하면 app 리로딩 될 때마다 새롭게 생성
const usersInfo = [
    {
        id: String(Date.now() * 123),
        username: "jjanmo",
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
        id: String(Date.now() * 321),
        username: "node",
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

//passport local-strategy 에 대한 내용 설정(LocalStrategy객체 생성)
passport.use(new LocalStrategy(
    function (username, password, done) {
        //console.log(username, password);
        //-> parameter :  login form에서 input의 name property값과 연결됨 
        //-> name에 적힌 값을 그대로 써야 mapping 됨

        //자체적인 내부 로직에 대한 코드
        //-> 여기선 파일을 이용한 인증 방법이기때문에 기존 코드를 사용함    
        for (let user of usersInfo) {
            if (user.username === username) {
                return hasher({ password: password, salt: user.salt }, function (err, pass, salt, hash) {
                    if (user.password === hash) {
                        console.log('localStrategy', user);
                        done(null, user);
                        //done(param1, param2, param3)
                        //param1 : error정보를 넣는 곳(error 설정), 무조건 실패하는 경우에만 적음, 여기선 성공하는 경우이기때문에 null
                        //param2 : user정보객체 -> ture or truthy value -> user정보객체를  가지고 passport.serializeUser()로 연결
                        //param3 : option, error message content - 비밀번호가 틀렸을 경우 이에 대한 메세지를 표시하고 싶다면 적어줌)
                    } else {
                        done(null, false);
                    }
                });
            }
        }
        done(null, false);
    }
));

//session 설정
//유저가 사이트에 처음 로그인하면 하면 이곳으로 와서 세션 정보를 [req.session.passport.user]에 저장함
passport.serializeUser(function (user, done) {
    //parameter 'user' = LocalStrategy()에서 로그인에 성공했을때 done()의 두번째 인자
    console.log('serialize', user);
    done(null, user.id);
    //user.id는 정확하게 [req.session.passport.user]에 저장됨 -> 이것을 인자로서 deserializeUser()를 호출함
});

// 이후 접속하면(서버에 요청이 들어오면) 접속한 세션정보를 DB(여기선 파일안의 정보)와 비교함
passport.deserializeUser(function (id, done) {
    //parameter 'id' = serializeUser()에서 done()의 두번째 인자인 user.id를 받는것
    console.log('deserializeUser', id);
    const user = usersInfo.filter(user => user.id === id)[0];
    done(null, user); //user가 req.user에 저장됨
})

//login : get
app.get("/auth/login", function (req, res) {
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
app.post("/auth/login",
    passport.authenticate('local', //passport.authenticate()[middleware]와 위에서 생성한 LocalStrategy객체와 연결함
        //만약에 타사 인증이라면 이 부분이 facebook 등으로 변경 될 것
        {
            successRedirect: '/welcome',
            failureRedirect: '/auth/login'
            //failureFlush: false
            //failureFlush option이 true일 경우, 로그인 실패시 한번 실패에 대한 메세지를 출력해주는 기능을 함
        }
    )
);

app.get("/auth/logout", function (req, res) {
    //passport.js를 로그아웃방법
    req.logout();
    req.session.save(function () {
        res.redirect("/welcome");
    });
});

//welcome page
app.get("/welcome", function (req, res) {
    const user = req.user;
    console.log(user);
    if (user) {
        res.send(`
                <h2>Hello ${user.nickname}!!</h2>
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

app.post("/auth/register", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const nickname = req.body.nickname;

    //사용자 정보를 추가할 때 이미있는 사용자인지를 확인할 필요가 있음
    for (let user of usersInfo) {
        //->이 곳을 forEach()로 돌릴경우 위(login)에서 발생했던 에러와 같은 에러발생
        if (username === user.name) {
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
                    id: String(Date.now()),
                    username: username,
                    password: hash,
                    salt: salt,
                    nickname: nickname
                };
                usersInfo.push(userObj);
                console.log(usersInfo);

                //passport.js를 통한 회원가입 후 자동 로그인 로직(passport를 통해 중간에 로그인하는 방법)
                req.login(userObj, function (err) {
                    if (err) { return next(err) }
                    req.session.save(function () {
                        return res.redirect('/welcome');
                    })
                })
            });
        }
    }
});
