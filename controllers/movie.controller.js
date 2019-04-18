const Movie = require("../models/movie.model"),
      User = require("../models/user.model"),
      UserRating = require('../models/user_rating.model');

module.exports = {

    search: async function (req, res) {
        var query = req.body.query;

        const results = await Movie.find({title: new RegExp(/a[^A-Za-z0-9_]/) } );

        res.send(results);
    },

    get_movie_list: function (req, res) {
        Movie.find({}, function(err, results) {
            if (err) {
                return res.render('pages/index', {user: req.user});
            }

            res.render('pages/catalog', {user: req.user, movies: results});
        });
    },

    get_movie: function (req, res) {
        Movie.findById(req.params.id)
        .populate('ratings')
        .exec(function(err, movie) {
            if (err) return res.redirect('/');
            if (movie !== undefined && movie != null) {
                console.log(movie);
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
            res.redirect('/');
        })
    },

    rate_movie: function (req, res) {
        console.log(typeof req.user._id + ` ${req.user._id}`);
        console.log(typeof req.body.movieId + ` ${req.body.movieId}`);
        console.log(typeof req.body.ratingSelector + ` ${req.body.ratingSelector}`);
        console.log(req.user._id);
        //var rating = new UserRating();
        UserRating.create({
            user: req.user._id,
            movie: req.body.movieId,
            rating: req.body.ratingSelector
        }, function(err, rating) {
            if (err) return res.send(err);
            Movie.findOneAndUpdate({_id: req.body.movieId}, 
                {$push: {ratings: rating}},
                {upsert: true},
                function(err, movie) {
                    if (err) return res.send(err);
                    User.findOneAndUpdate({_id: req.user._id},
                        {$push: {ratings: rating}},
                        {upsert: true},
                        function(err, user) {
                            if (err) res.send(err);
                            res.redirect(`/movies/${req.body.movieId}`);
                        });
                })
            })
    }

}