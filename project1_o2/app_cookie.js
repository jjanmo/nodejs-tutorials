const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});

app.use(cookieParser());

app.get('/count', function (req, res) {
    let cookieCnt = req.cookies.count ? Number(req.cookies.count) : 0;
    //req.cookies.쿠키이름 : 사용자가 가지고 있는 쿠키를 확인
    cookieCnt++;
    res.cookie('count', cookieCnt); //쿠키를 저장(쿠키를 생성해서 로컬에 보낸 후 로컬에서 저장)
    res.send(`count : ${cookieCnt}`);
})
/*
//쿠키에 대해서 간단하게 정리
- 쿠키 : 클라이언트(로컬)에 저장되는 키와 값이 들어있는 작은 데이터
- 클라이언트의 상태정보를 로컬에 저장했다가 참조한다
- 동작방식
1) 클라이언트가 페이지 요청 2) 서버에서 쿠키생성
3) HTTP header에 쿠키를 포함시켜서 응답(response)
4) 같은 요청이 들어올 경우 HTTP header에 쿠키를 함께 보냄(request)
5) 서버에서 쿠키를 읽어서 상태가 변경될 필요성이 있는 경우 변경된 정보를 쿠키에 저장시켜서 보냄(response)
*/


