// node/express application
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');



// puts post request body data and store it on req.body
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 3000);

// Our song data
var songs = [
  {
    artist: "Bruce Springstein",
    title: "Born in the U.S.A.",
    dateAdded: new Date().toLocaleDateString()
  }
];

// Routes
app.post('/songs', function(req, res) {
  // req.body is supplied by bodyParser above
  var duplicatedCount = 0;
  console.log("REQ body: ", req.body);
  var newSong = req.body;
  if (newSong.title === "") {
    res.sendStatus(400);
  }
  for (var i = 0; i < songs.length; i++) {
    if (songs[i].title == newSong.title) {
      duplicatedCount++;
    }
  }
  if (duplicatedCount > 0) {
    console.log("Already added!");
    res.sendStatus(400);
  } else {
    var currentDate = new Date();
    newSong.dateAdded = currentDate.toLocaleDateString();
    songs.push(newSong);
    console.log(songs);
    res.sendStatus(201);
  }



  // created new resource

});

app.get('/songs', function(req, res) {
  console.log('handling get request for songs');
  // response options
  // res.sendStatus(200);
  res.send(songs);
});

// static file routing
app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  console.log(file);

  res.sendFile(path.join(__dirname, './public/', file));
  // /public/views/index.html
});

app.listen(app.get('port'), function() {
  console.log('Server is listening on port ' + app.get('port'));
});
