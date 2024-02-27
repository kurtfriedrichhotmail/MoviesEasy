var express = require('express');
var router = express.Router();
var fs = require("fs");

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




let fileManager  = {
  read: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    let goodData = JSON.parse(rawdata);
    serverArray = goodData;
  },

  write: function() {
    let data = JSON.stringify(serverArray);
    fs.writeFileSync('objectdata.json', data);
  },

  validData: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    console.log(rawdata.length);
    if(rawdata.length < 1) {
      return false;
    }
    else {
      return true;
    }
  }
};
  


if(!fileManager.validData()) {
serverArray.push(new MovieObject("Moonstruck", 1981, "Drama", "Nicholas Cage", "Cher", "https://www.youtube.com/watch?v=M01_2CKL6PU"));
serverArray.push(new MovieObject("Wild At Heart", 1982, "Drama", "Nicholas Cage", "Laura VanDern", "https://www.youtube.com/watch?v=7uRJartX79Q"));
serverArray.push(new MovieObject("Raising Arizona", 1983, "Comedy", "Nicholas Cage", "Holly Hunter", "https://www.youtube.com/watch?v=NoXJKArYi1g"));
serverArray.push(new MovieObject("USS Indianapolis: Men of Courage", 2016, "Drama", "Nicholas Cage", "Emily Tennant", "https://youtu.be/ZDPE-NronKk"));
fileManager.write();
}
else {
  fileManager.read(); // do have prior movies so load up the array
}

console.log(serverArray);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});


/* GET all Movie data */
router.get('/getAllMovies', function(req, res) {
  fileManager.read();
  
  res.status(200).json(serverArray);
});

/* Add one new movie */
router.post('/AddMovie', function(req, res) {
  const newMovie = req.body;
  serverArray.push(newMovie);
  fileManager.write();
  res.status(200).json(newMovie);
});



// add route for delete
router.delete('/DeleteMovie/:ID', (req, res) => {
  const delID = req.params.ID;
  let pointer = GetObjectPointer(delID);
  if(pointer == -1){    // if did not find movie in array
      console.log("not found");
      return res.status(500).json({
          status: "error - no such ID"
       });
  }
else {    // if did find the movie
    serverArray.splice(pointer, 1);  // remove 1 element at index 
    fileManager.write();
    res.send('Movie with ID: ' + delID + ' deleted!');
}
});


function GetObjectPointer(whichID){
  for(i=0; i< serverArray.length; i++){
      if(serverArray[i].ID == whichID){
          return i;
      }
  }
  return -1;
}


module.exports = router;
