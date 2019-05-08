/* populateImageURLs.script.js - 

NOT FUNCTIONAL

Attempts to pull poster images into the database with the OMDB Poster API

    Author: Austin Hess
*/

var mongoose   = require('mongoose'),
    request    = require('request-promise'),
    fs         = require('fs'),
    csv        = require('csv-parser');

// Connect to the MongoDB cloud instance
let dev_db_url = "mongodb+srv://ahess:-%24GMvyLwc8Lr%5E7a@movierecs-jit0p.gcp.mongodb.net/test?retryWrites=true";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection failed:'));

var Movie = require('../models/movie.model');

// Start asynchronous promise chain to make with file streams
const linksPath = __dirname + '/data/links.csv';
var urls = [];
var i = 0;
loadCsvToArray(linksPath)
.then(function(links) {
    var secondary = [];
    var linksList = links;
    links.forEach(function(item) {
        secondary.push(getURL(item.imdbId));
    });
    urls.push(secondary);
    return Promise.all(urls[i]);
})
.then(function(urls) {
    urls.forEach((item) => {
        console.log(item);
    })
})
.catch((err) => {
    console.error(err);
})

// Function to return an HTTP response from the API in an attempt to make this function synchronous so it waits for the response to return each time
// Ended up stacking up requests and it overloaded the Node.js EventEmitter
async function getURL(id) {
    let options = {
        uri: 'http://private.omdbapi.com/?apikey=2a9d2191&i=' + id,
        timeout: 60000,
        method: 'GET'
    };
    var res = await request(options);
    return res;
}

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


