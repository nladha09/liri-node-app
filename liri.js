// add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

// required node packages
var moment = require("moment");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var inquirer = require("inquirer");
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

var whatToDo = process.argv[2];
var input = process.argv.slice(3).join(" ");

// console.log(whatToDo);

runLiri(whatToDo);

function runLiri(whatToDo) {

  if (whatToDo === "concert-this") {
    concertThis(input);
  }
  if (whatToDo === "spotify-this-song") {
    spotifyThis(input);
  }
  if (whatToDo === "movie-this") {
    movieThis(input);
  }
  if (whatToDo === "do-what-it-says") {
    doIt();
  }
}
// ****need to fix inqurier and change time for concert-this using moment

var questions = [{
  type: 'list',
  name: 'programs',
  message: 'What would you like to do?',
  choices: ['Concert', 'Spotify', 'Movie', 'Do what it says']
},
{
  type: 'input',
  name: 'concertChoice',
  message: 'What\'s the name of the artist you would like to search?',
  when: function (answers) {
      return answers.programs == 'Concert';
  }
},
{
  type: 'input',
  name: 'movieChoice',
  message: 'What\'s the name of the movie you would like to search?',
  when: function (answers) {
      return answers.programs == 'Movie';
  }
},
{
  type: 'input',
  name: 'songChoice',
  message: 'What\'s the name of the song you would like to search?',
  when: function (answers) {
      return answers.programs == 'Spotify';
  }
},
];

inquirer
.prompt(questions)
.then(answers => {
  // Depending on which program the user chose to run it will do the function for that program
  switch (answers.programs) {
      case 'Concert':
          concertThis(answers.concertChoice);
          break;
      case 'Spotify':
          spotifyThis(answers.songChoice);
          break;
      case 'Movie':
          movieThis(answers.movieChoice);
          break;
      case 'Do what it says':
          doWhatItSays();
          break;
      default:
          console.log('LIRI doesn\'t know that');
  }
});

function concertThis(input) {

  // console.log(input);
  axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
    .then(
      function (response) {

        // console.log("\n---------------------------------------------------\n")
        // console.log(response.data);
        response.data.forEach(concert => {
          console.log(concert.venue.name)
          console.log(concert.venue.city + ", " + concert.venue.region)
          console.log(concert.datetime)
          console.log("---------------------------")
        })
        // console.log("\n---------------------------------------------------\n")
      }
    );
}


function spotifyThis(input) {

  if (!input) {
    input = "ace+of+base+the+sign";
  }
  spotify.search({ type: 'track', query: input }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("\n---------------------------------------------------\n")
    console.log("Artist: " + data.tracks.items[0].artists[0].name)
    console.log("Song: " + data.tracks.items[0].name)
    console.log("Preview: " + data.tracks.items[3].preview_url)
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("\n---------------------------------------------------\n")

  });
}


function movieThis(input) {

  if (!input) {
    input = "mr+nobody";
  }

  axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy")
    .then(
      function (response) {

        console.log("\n---------------------------------------------------\n")
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes: " + response.data.Ratings[1]);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Movie Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("\n---------------------------------------------------\n")
      }
    )
};

function doWhatItSays() {

  fs.readFile("random.txt", "utf8", function (error, data) {
    var arr = data.split(",");
    var task = arr[0];
    var input = arr[1].split('"').join('');

    console.log(arr);
    console.log(task);
    console.log(input);

    if (error) {
      return console.log(error);
    }

    if (task === "concert-this") {
      concertThis(input);
    }
    if (task === "spotify-this-song") {
      spotifyThis(input);
    }
    if (task === "movie-this") {
      movieThis(input);
    }

  });
}
