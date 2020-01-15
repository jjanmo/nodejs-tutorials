const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.listen(port, () => console.log(`start! listen on the port ${port}`));

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

//url routing 
app.get('/search', function (req, res) {
    res.sendFile(__dirname + '/public/search.html');
});

app.post('/search', function (req, res) {
    const keyword = req.body.keyword;
    //data
    const movieData = JSON.parse(fs.readFileSync('./data/movie.txt', 'utf8'));
    const movieList = movieData.movies; //array
    const searchedMovie = movieList.filter(ele => {
        return ele.moviename.toLowerCase().includes(keyword.toLowerCase());
    })
    console.log(searchedMovie);
    res.json(searchedMovie);
});
