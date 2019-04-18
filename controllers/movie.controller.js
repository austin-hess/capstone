const Movie = require("../models/movie.model");

module.exports = {

    search: async function (req, res) {
        var query = req.body.query;

        const results = await Movie.find({title: new RegExp(/a[^A-Za-z0-9_]/) } );

        res.send(results);
    },

    get_movie_list: function (req, res) {
        Movie.find({}, function(err, results) {
            if (err) {
                return res.render('pages/index');
            }

            res.render('pages/catalog', {user: req.user, movies: results});
        });
    },

    get_movie: function (req, res) {
        
    }

}