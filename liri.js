require("dotenv").config();

// Installing modules.
var axios = require("axios");
var dotenv = require("dotenv");
var moment = require("moment");
var fs = require("fs");
var Spotify = require("node-spotify-api");


  // To check what your id and secret code is.
    var spotify = new Spotify({
      id: "59519a4762c94bbb8e1a72b8249be01c",
      secret: "ac905f17fd954e34bd6bd7e23f548b1d"
        //id: result.parsed.SPOTIFY_ID,
        //secret: result.parsed.SPOTIFY_SECRET,
    });

// Console arguments
var command = process.argv[2];
var searchD = process.argv.slice(3).join(" ");

//Switch Case Statements.

switch (command) {
    case "spotify-this-song":
      spotSearch(searchD);
      break;
    
    case "concert-this":
      concertSearch(searchD);
      break;
    
    case "movie-this":
      movieSearch(searchD);
      break;
    
    case "do-what-it-says":
      doWhatItSays();
      break;
    }


// Functions


//Spotify-this Song
function spotSearch (searchD){
spotify.search({ type: 'track', query: searchD}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    
  console.log("This song is from the album " + data.tracks.items[0].album.name); 
  console.log("The artist(s) in this track is " + data.tracks.items[0].album.artists[0].name); 
  console.log("The song's name is " + data.tracks.items[0].name); 
  console.log("Preview the song at: " + data.tracks.items[0].preview_url);
  
 });
}

function concertSearch(searchD){
  let searchBands = searchD.replace(/ /g, "+");
  axios.get("https://rest.bandsintown.com/artists/" + searchBands + "/events?app_id=codingbootcamp").then(
    function(response) {
      console.log(searchD +  " is/are performing at " + response.data[0].venue.name);
      console.log("Location: " + response.data[0].venue.city + " " + response.data[0].venue.region);
      //Converting to readable date.
      let a = response.data[0].datetime;
      let b = moment(a).format("MM-DD-YYYY");
      console.log(b);
    }
  );
}

function movieSearch(searchD){
  // Replacing any spaces with "+"
  let searchMov = searchD.replace(/ /g, "+");

  axios.get("http://www.omdbapi.com/?t=" + searchMov + "&y=&plot=short&apikey=trilogy").then(
  function(response) {

    console.log("Movie Title: "  + response.data.Title);
    console.log("Release Year: " +response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rating from " +  response.data.Ratings[1].Source + " = " + response.data.Ratings[1].Value);
    console.log("This movie was made in " + response.data.Country);
    console.log("This movie is availabile in " + response.data.Language + ".");
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " +response.data.Actors);

  }
);
}

function doWhatItSays(){

  //Reading the file,
  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }
    //console.log(data);

    //split before the comma, take this as the command.
    let a = data.split(",");
    let arg = a[0];
    let searchFor = a[1];

    
    // Run different cases depending on the argument. 
    let command = arg;
    let searchD = searchFor;

    switch (command) {
      case "spotify-this-song":
      spotSearch(searchD);
        break;
      
      case "concert-this":
      concertSearch(searchD);
        break;
      
      case "movie-this":
      movieSearch(searchD);
      break;

    }
});
}
