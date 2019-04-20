const User                  = require ("../models/user.model"),
      request               = require('request');

module.exports = {

    get_user_profile: function (req, res) {
        res.render('pages/profile', {user : req.user});
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

    get_recommendations: function (req, res) {
        // get current user ID
        var userId = req.user._id;
        request({
            method: 'POST',
            uri: 'https://ibcf-service.ml/prediction',
            body: {
                user_id: userId
            },
            json: true
        }, function(err, res, body) {
            console.log(res);
        });
    }
}