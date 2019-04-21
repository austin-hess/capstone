const User                  = require ("../models/user.model"),
      Movie                 = require('../models/movie.model'),
      request               = require('request');

module.exports = {

    get_user_profile: function (req, res) {
        
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