/* populateMovies.script.js - 

Script to initially populate the database with the movies

Author: Austin Hess
*/

var mongoose = require('mongoose');

// The DB is "test" in this URL, determines which DB to insert the collection of movies into
const mongoDB = "mongodb+srv://ahess:xxxxxxxxx.gcp.mongodb.net/test?retryWrites=true";
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection failed:'));

var Movie = require('../models/movie.model');

const fs = require('fs');
const csv = require('csv-parser');
const request = require('request-promise');

const linksPath = __dirname + '/data/test-links.csv';
const moviesPath = __dirname + '/data/test_movies.csv';

var linksList = [];
var movies = [];
var docs = [];

// Vain attempt to provide an exit code in the console to tell me all insertions were complete (they are asynchronous)
// Did not get these working correctly yet
process.on('exit', function(code) {
    console.log(`Exiting with ${code}`);
});

/* Start promise chain to load in CSV and parse out each row */
loadCsvToArray(moviesPath)
.then(function(movies) {
    movies.forEach(async function(row, i) {

        // Get the MovieLens movieID
        let movieId = row.movieId.trim();
    
        // Instantiate new Movie object model
        let item = new Movie();

        // Get the row - assume there is a year at the end
        item.title = row.title.slice(0, row.title.length - 6).trim();

        // Assuming year on end as '(year)', slice off
        item.year = row.title.slice(row.title.length - 5, row.title.length - 1);

        // If the title row does not end in a parenthesis then we know there is no year attached
        if (row.title.trim()[row.title.trim().length - 1] != ')') {

            // Save the whole title row to title and 'NA' to the year property because we discovered there was no year included in the title column
            item.title = row.title.slice(0).trim();
            item.year = 'NA';
        }

        // Get the list of the genres delimited by '|'
        item.genres = row.genres.split('|');

        // If the first element equals '(no genres listed)' that means there are no genres
        if (item.genres[0] === "(no genres listed)") {
            // Leave genres array empty
            item.genres = []
        }
        
        // Assign the MovieLens movieID as a casted integer
        item.ml_id = Number(movieId);

        docs.push(item);
        
    });

    console.log('Inserting movies...');

    // Insert all of the documents into the collection
    Movie.insertMany(docs, function(err, movs) {
        if (err) return console.error(err);
    });
    
   return Promise.resolve();
})
.then(function() {
    console.log('complete');
})

// Loads a CSV file into an array by row
// Uses a filesystem stream to read in the lines
function loadCsvToArray(path) {
    return new Promise((resolve, reject) => {
        var arr = [];
        var stream = fs.createReadStream(path)
        .pipe(csv())
        .on('data', (row) => {
            arr.push(row);
        })
        .on('end', () => {
            console.log(`File at ${path} successfully stored in array`);
            resolve(arr);
        });
    });
}




