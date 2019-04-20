const User                  = require ("../models/user.model"),
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
        }, function(err, res, body) {
            console.log(body);
            if (err) res.send(err);
            res.render('pages/profile', {user : req.user, recommendations: body});
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