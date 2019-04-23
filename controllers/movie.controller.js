const Movie = require("../models/movie.model"),
      User = require("../models/user.model"),
      UserRating = require('../models/user_rating.model'),
      mongoose = require('mongoose'),
      request = require('request');

module.exports = {

    search: async function (req, res) {
        var query = req.body.query;

        const results = await Movie.find({title: new RegExp(/a[^A-Za-z0-9_]/) } );

        res.send(results);
    },

    get_movie_list: function (req, res) {
        Movie.find({}).sort('title').exec(function(err, results) {
            if (err) {
                return res.send(err);
            }

            res.render('pages/catalog', {user: req.user, movies: results});
        });
    },

    get_movie: function (req, res) {
        Movie.findById(req.params.id)
        .populate('ratings')
        .exec(function(err, movie) {
            if (err) return res.send(err);
            if (movie !== undefined && movie != null) {
                var alreadyRated = false;
                var prevRating = null;
                movie.ratings.forEach(function(rating) {
                    if (rating.user == req.user._id.toString() && rating.movie == movie._id.toString()) {
                        console.log('rating already exists for this user');
                        alreadyRated = true;
                        prevRating = rating.rating;
                    }
                })
                return res.render('pages/movie_detail', {user: req.user, movie: movie, alreadyRated: alreadyRated, prevRating: prevRating});
            }
            res.send('Got nothing');
        })
    },

    rate_movie: async function (req, res) {
        // get required parameters
        var user = req.user;
        var movieID = mongoose.Types.ObjectId(req.body.movieId);
        var rating = Number(req.body.ratingSelector);
        // create UserRating 
        var newRating = new UserRating({
            user: user._id,
            movie: movieID,
            rating: rating
        });
        // save new UserRating
        newRating = await newRating.save();
        // find the movie that was rated and add the ObjectId to its ratings array
        var updatedMovie = await Movie.findOneAndUpdate({'_id': movieID}, { $push: {ratings: newRating._id}}, {'new': true}).exec();
        // find the current user and add the ObjectId to its ratings array
        // if the movie the user rated is already in their predictions array, then $pull it
        var updatedUser = await User.findOneAndUpdate({'_id': user._id}, { $push: {ratings: newRating._id}, $pull: {predictions: movieID}}, {'new': true}).exec();
        // send a GET request to ibcf-service to re-calculate predictions
        let options = {
            uri: 'https://ibcf-service.ml/calculate',
            method: "GET"
        };
        console.log("Requesting prediction re-calculation from ibcf-service");
        request(options, function(err, res, body) {
            if (err) console.log("Error with /calculate on ibcf-service");
            console.log("Successful recalculation ibcf-service");
        });
        console.log(updatedUser);
        console.log(updatedMovie);
        res.redirect('/movies/list');
    }

}