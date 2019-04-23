var mongoose = require('mongoose');

let dev_db_url = "mongodb+srv://ahess:Runyourdayallweeklong%231@movierecs-jit0p.gcp.mongodb.net/test2?retryWrites=true";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection failed:'));

var User = require('../models/user.model');

const fs = require('fs');
const csv = require('csv-parser');

const ratingsPath = __dirname + '/data/ratings.csv';
const linksPath = __dirname + '/data/links.csv';
const moviesPath = __dirname + '/data/movies.csv';

// load ratings file into an array
var ratings = [];

process.on('exit', function(code) {
    console.log(`Exiting with ${code}`);
});

const trainerPW = '##special##';
const trainerEmail = 'trainer@trainer.com';
const trainerFN = 'Movie';
const trainerLN = 'Lover';

loadCsvToArray(ratingsPath)
.then(function(ratings) {
    
    var userLookup = {};
    console.log(ratings);

    ratings.forEach(function(row) {
        if (userLookup[row.userId] != true) {
            userLookup[row.userId] = true;
            let usr = new User({
                username: 'trainer' + row.userId,
                password: trainerPW,
                email: trainerEmail,
                first_name: trainerFN,
                last_name: trainerLN,
                ratings: [],
                predictions: []
            });
            usr.save(function(err, usr) {
                if (err) return console.error(err);
                console.log('New user:');
                console.log(usr);
            })
        }
    })

    return Promise.resolve();
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




