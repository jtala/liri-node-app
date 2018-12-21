require("dotenv").config();

// Installing modules.
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var fs = require("fs");
var Spotify = require("node-spotify-api");

// To check what your id and secret code is.
var spotify = new Spotify(keys.spotify);
      
    
// Console arguments
var command = process.argv[2];
var searchD = process.argv.slice(3).join(" ");

//switch depending on commands
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

function spotSearch (searchD){
spotify.search({ type: 'track', query: searchD}, function(err, data) {
    if (err) {
      console.log("This song is from the album Happy Nation.");
      console.log("The artist(s) in this track is Ace of Base"); 
      console.log("The song's name is The Sign"); 
      console.log("Preview the song at: https://www.youtube.com/watch?v=iqu132vTl5Y");
      
      return console.log("Spotify can't find the song you chose, but here's an awesome song instead.");
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
    // If the we can't find the movie database,  show them Mr Nobody.
    if (response.data.Response === "False"){
      return mrNobody();
      function mrNobody(){
      console.log("We can't find that movie in our database, but Mr. Nobody's an awesome movie, so here's the info for that!");
      console.log("Movie Title: Mr. Nobody");
      console.log("Release Year: 2009");
      console.log("IMDB Rating: 7.9");
      console.log("Rating from Rotten Tomatoes = 67%");
      console.log("This movie was made in  ‎Belgium, Canada, France & Germany");
      console.log("This movie is availabile in English.");
      console.log("Plot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.");
      console.log("Actors: Jared Leto, Sarah Polley, Diane Kruger");
      }
    }

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

    //split before the comma, take this as the command.
    let a = data.split(",");
    let arg = a[0];
    let searchFor = a[1];

    // If readtext asks for a concert, OMDB doesn't like the extra quotes, so we have to get rid of it.
    if (arg === "concert-this"){
      var noQuotes = searchFor.substr(1).slice(0,-1);

      let command = arg;
      let searchD = noQuotes;

      switch (command) {
      
        case "concert-this":
        concertSearch(searchD);
        break;

      }
    }
    
    // The other two commands run ok with the quotes, so we can leave them there.
    let command = arg;
    let searchD = searchFor;

    switch (command) {
      case "spotify-this-song":
      spotSearch(searchD);
      break;

      case "movie-this":
      movieSearch(searchD);
      break;
    }
});
}
