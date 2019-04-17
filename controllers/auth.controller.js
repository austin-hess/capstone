var express                         = require('express'),
    User                            = require('../models/user.model'),
    passport                        = require('passport');

module.exports = {

    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    },

    register: function (req, res) {
        User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
            if (err) {
                console.log(err);
                return res.render('pages/registration');
            }
            // Logs user in
            passport.authenticate("local")(req, res, function() {
                console.log("User created: " + req.user);
                res.redirect("/");
            })
        });
    },

}