const Movie = require("../models/movie.model");

module.exports = {

    search: async function (req, res) {
        var query = req.body.query;

        const results = await Movie.find({title: new RegExp(/a[^A-Za-z0-9_]/) } );

        res.send(results);
    }

}