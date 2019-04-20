const User                  = require ("../models/user.model"),
      Movie                 = require('../models/movie.model'),
      mongoose              = require('mongoose'),
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
            var idlist = [];
            body.forEach(function(rec) {
                idlist.push(mongoose.Types.ObjectId(rec.movieId));
            });
            Movie.find({'_id': { $in: idlist }}, function(err, movies) {
                if (err) return res.send(err);
                movies.forEach(function(item) {
                    item._id = rec.movieId;
                    item.title = movie.title;
                    item.year = movie.year;
                    item.rating = rec.ratingPred;
                    recommendations.push(item);
                })
            });
            res.render('pages/profile', {user : req.user, recommendations: recommendations});
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
