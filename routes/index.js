var express = require('express');
var router = express.Router();

// start by creating data so we don't have to type it in each time
let serverArray = [];

// define a constructor to create movie objects
let MovieObject = function (pTitle, pYear, pGenre, pMan, pWoman, pURL) {
    this.Title = pTitle;
    this.Year = pYear;
    //this.ID = movieArray.length + 1;
    this.ID = Math.random().toString(16).slice(5)  // tiny chance could get duplicates!

    this.Genre = pGenre;  // action  comedy  drama  horrow scifi  musical  western
    this.Man = pMan;
    this.Woman = pWoman;
    this.URL = pURL;
}


serverArray.push(new MovieObject("Moonstruck", 1981, "Drama", "Nicholas Cage", "Cher", "https://www.youtube.com/watch?v=M01_2CKL6PU"));
serverArray.push(new MovieObject("Wild At Heart", 1982, "Drama", "Nicholas Cage", "Laura VanDern", "https://www.youtube.com/watch?v=7uRJartX79Q"));
serverArray.push(new MovieObject("Raising Arizona", 1983, "Comedy", "Nicholas Cage", "Holly Hunter", "https://www.youtube.com/watch?v=NoXJKArYi1g"));
serverArray.push(new MovieObject("USS Indianapolis: Men of Courage", 2016, "Drama", "Nicholas Cage", "Emily Tennant", "https://youtu.be/ZDPE-NronKk"));

console.log(serverArray);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});


/* GET all Movie data */
router.get('/getAllMovies', function(req, res) {
  res.status(200).json(serverArray);
});


module.exports = router;
