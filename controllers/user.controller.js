const User                  = require ("../models/user.model"),
      Movie                 = require('../models/movie.model'),
      request               = require('request');

module.exports = {

    get_user_profile: function (req, res) {

        var userId = req.user._id;
        request({
            method: 'POST',
            uri: 'https://ibcf-service.ml/prediction',
            body: {
                user_id: userId
            },
            json: true
        }, function(err, response, body) {
            console.log(body);
            if (err) res.send(err);
            var recommendations = [];
            var counter = 0;
            body.forEach(async function(rec) {
                var item = {};
                try {
                    var movie = Movie.findById(rec.movieId);
                    item._id = rec.movieId;
                    item.title = movie.title;
                    item.year = movie.year;
                    item.rating = rec.ratingPred;
                    recommendations.push(item);
                } catch (err) {
                    return res.send(err);
                }
            })
            res.render('pages/profile', {user : req.user, recommendations: []});
        });
    },

    update_user: function (req, res) {
        User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
            if (err) return next(err);
            res.send('User updated');
        });
    },

    delete_user: function (req, res) {
        User.findByIdAndRemove(req.params.id, function(err) {
            if (err) return next(err);
            res.send('Deleted user succesfully');
        });
    },
}