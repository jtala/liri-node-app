// Installing modules.

var dotenv = require("dotenv");
var result = dotenv.config()
var moment = require("moment");
var Spotify = require("node-spotify-api");

  // To check what your id and secret code is.
    var spotify = new Spotify({
        id: result.parsed.SPOTIFY_ID,
        secret: result.parsed.SPOTIFY_SECRET
    });
        //console.log(spotify);


// Console arguments
var command = process.argv[2];
var searchD = process.argv.slice(3).join(" ");


//Switch Case Statements.

switch (command) {
    case "spotify-this-song":
      spotSearch();
      break;
    
    case "concert-this":
      concertSearch();
      break;
    
    case "movie-this":
      movieSearch();
      break;
    
    case "do-what-it-says":
      doWhatItSays();
      break;
    }

    

// Functions


//Spotify-this Song
function spotSearch (){
spotify.search({ type: 'track', query: searchD}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    
  //console.log(data.tracks)
  console.log("This song is from the album " + data.tracks.items[0].album.name); 
  console.log("The artist(s) in this track is " + data.tracks.items[0].album.artists[0].name); 
  console.log("The song's name is " + data.tracks.items[0].name); 
  console.log("Preview the song at: " + data.tracks.items[0].preview_url);
  


 });
}

function concertSearch(){

}

function movieSearch(){

}

function doWhatItSays(){

}




    

