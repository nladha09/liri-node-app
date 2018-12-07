// variable for dotenv package
var dotEnv = require("dotenv").config();
// variable to store the keys.js file (needs ./)
var keysReference = require('./keys.js');
// variable to access spotify key info
var spotify = new Spotify(keys.spotify);