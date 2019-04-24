var mongoose = require('mongoose');

let dev_db_url = "mongodb+srv://ahess:Runyourdayallweeklong%231@movierecs-jit0p.gcp.mongodb.net/demo1?retryWrites=true";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
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

process.on('exit', function(code) {
    console.log(`Exiting with ${code}`);
});

/*
loadCsvToArray(linksPath)
.then(function(links) {
    linksList = links;
    return loadCsvToArray(moviesPath);
})*/

loadCsvToArray(moviesPath)
.then(function(movies) {
    movies.forEach(async function(row, i) {
        let movieId = row.movieId.trim();
    
        // get the title, year, and genre
        let item = new Movie();
        // get the row - assume there is a year at the end
        item.title = row.title.slice(0, row.title.length - 6).trim();
        // assuming year on end as '(year)', slice off
        item.year = row.title.slice(row.title.length - 5, row.title.length - 1);
        // if the title row does not end in a parenthesis then there is no year attached
        if (row.title.trim()[row.title.trim().length - 1] != ')') {
            // save the whole title row to title and 'NA' to the year property
            item.title = row.title.slice(0).trim();
            item.year = 'NA';
        }
        // get the list of the genres delimited by '|'
        item.genres = row.genres.split('|');
        // if the first element equals '(no genres listed)' that means there are no genres
        if (item.genres[0] === "(no genres listed)") {
            // leave genres array empty
            item.genres = []
        }

        item.ml_id = Number(movieId);

        docs.push(item);
        
    });
    console.log('Inserting movies...');
    Movie.insertMany(docs, function(err, movs) {
        if (err) return console.error(err);
        //console.log(movs);
    });
    
   return Promise.resolve();
})
.then(function() {
    console.log('complete');
})

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




