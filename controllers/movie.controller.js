const Movie = require("../models/movie.model");

module.exports = {

    search: function (req, res) {
        var query = req.body.query;
        var genre = req.body.genre;
        Movie.find({title: new RegExp(query, 'i')}, function(err, results) {
            if (err) 
                return res.render('pages/index');
            console.log(results);
            //res.render('pages/index', {movies: results});
        });
    }

}