var mongoose   = require('mongoose'),
    request    = require('request-promise'),
    fs         = require('fs'),
    csv        = require('csv-parser');

let dev_db_url = "mongodb+srv://ahess:Runyourdayallweeklong%231@movierecs-jit0p.gcp.mongodb.net/test?retryWrites=true";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection failed:'));

var Movie = require('../models/movie.model');

const linksPath = __dirname + '/data/links.csv';

loadCsvToArray(linksPath)
.then(function(links) {
    var urls = [];
    links.forEach(async function(item) {
        console.log(item.movieId);
        var res = await request('http://www.omdbapi.com/?i=tt' + item.imdbId + '&apikey=2a9d2191');
        console.log(res);
    })
});

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


