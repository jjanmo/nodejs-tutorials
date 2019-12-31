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


//implement 'similar' shopping cart
//game list object
const games = {
    a: {
        title: 'tropico 6',
        genre: 'simulation',
        price: 20000
    },
    b: {
        title: 'dark soul3',
        genre: 'action',
        price: 7000
    },
    c: {
        title: 'battle ground',
        genre: 'battle royale',
        price: 18000
    }
}


//game list router
app.get('/games', function (req, res) {
    let list = '<tr><th>TITLE</th><th>GENGRE</th><th>PRICE</th><th>BUTTON</th></tr>';
    for (let game in games) {
        //변수로서 객체에 접근할 때는 []를 이용해야함 
        list += `<tr>
                    <td>${games[game].title}</td>
                    <td>${games[game].genre}</td>
                    <td>${games[game].price}</td>
                    <td><a href="/cart/${game}">ADD</td>
                </tr>`;
    }

    res.send(`<h1>Game List</h1><table border="1" cellspacing="0">${list}</table><br><a href="/cart">Cart`);
});


//game cart router : add
app.get('/cart/:id', function (req, res) {
    const id = req.params.id;
    const cart = req.cookies.cart ? req.cookies.cart : {};
    if (!cart[id]) {
        cart[id] = 0;  //object property set
    }
    cart[id] = Number(cart[id]) + 1;
    res.cookie('cart', cart);
    res.redirect('/cart');
});

//game cart router
app.get('/cart', function (req, res) {
    const cart = req.cookies.cart;
    if (cart) {
        let list = '<tr><th>TITLE</th><th>GENGRE</th><th>PRICE</th><th>QUANTITY</th><th>DELETE</th></tr>';
        for (let id in cart) {
            //변수로서 객체에 접근할 때는 []를 이용해야함 
            list += `<tr>
                        <td>${games[id].title}</td>
                        <td>${games[id].genre}</td>
                        <td>${games[id].price}</td>
                        <td>${cart[id]}</td>
                        <td><a href="/cart/delete/${id}">Delete</td>
                    </tr>`;
        }
        res.send(`<h1>Cart List</h1><table border="1" cellspacing="0">${list}</table><br><a href="/games">Games`);

    }
    else {
        res.send('Cart is empty!!');
    }
})

//game cart : delete 
app.get('/cart/delete/:id', function (req, res) {
    const id = req.params.id;
    const cart = req.cookies.cart;
    for (let game in cart) {
        if (game === id) {
            cart[game] = Number(cart[game]) - 1;
            if (cart[game] === 0) delete cart[game];
        }
    }
    res.cookie('cart', cart);
    res.redirect('/cart');
});