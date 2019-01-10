# liri-node-app :musical_note:

Search Spotify for songs, Bands in town for concerts and OMBD for movies.

[See video walkthrough here (full screen has better view)](https://drive.google.com/file/d/1-PQKsU95OHgkSKqUyLhwLfQSS4j4gjvV/view?usp=sharing)

## How to use 
Use node to run this program. Use node liri.js then run one of the following comands, then add search text:

### Inquirier will ask you "What would you like to do?"

Example:
* Concert ( `concert-this`)
* Spotify ( `spotify-this-song`)
* Movie ( `movie-this`)
* Do what it says ( `do-what-it-says`)

### Selecting "Concert" you will be provided with:

* Name of the venue
* Venue location
* Date of the Event

### Selecting "Spotify" you will be provided with:

* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from
* If no song is provided then your program will default to "The Sign" by Ace of Base.

### Selecting "Movie" you will be provided with:

* Title of the movie.
* Year the movie came out.
* IMDB Rating of the movie.
* Rotten Tomatoes Rating of the movie.
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.
* If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.

### Selecting "Do what it says" :

A random.txt file with search for spotify-this-song "I want it that way." 
This will give you the spotify results of "I want it that way."

### Technologies Used
* JavaScript
* Node.js (axios, inqurier, moment)
* Spotify API
* Bands in Town API
* OMDB API
