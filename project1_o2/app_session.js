const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;
app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});

app.use(session({
    secret: 'asdfasdfasf@#$%safdsfa',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))