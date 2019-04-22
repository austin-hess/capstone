var mongoose = require('mongoose');

let dev_db_url = "mongodb+srv://ahess:Runyourdayallweeklong%231@movierecs-jit0p.gcp.mongodb.net/test?retryWrites=true";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection failed:'));

var Movie = require('../models/movie.model');

const fs = require('fs');
const csv = require('csv-parser');

var lineNum = 0;
var header;
var stream = fs.createReadStream( __dirname + '/movies.csv')
.pipe(csv())
.on('data', (row) => {
    let item = new Movie({
        title: row.title.slice(0, row.title.length - 6).trim(),
        year: row.title.slice(row.title.length - 5, row.title.length - 1),
        genres: row.genres.split('|'),
        ratings: []
    });
    item.save(function(err, item) {
        if (err) return console.error(err);
        console.log(item);
    });
})
.on('end', () => {
    console.log('CSV file successfully processed');
})






