const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});

app.use(cookieParser());