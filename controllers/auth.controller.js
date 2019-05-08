/* auth.controller.js - Authorization controller functions
    - logout function
    - register function

    Author: Austin Hess
*/

var express                         = require('express'),
    User                            = require('../models/user.model'),
    passport                        = require('passport');

module.exports = {

    // Handles logout by using sessions - logout() provided by passport
    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    },

    // Handles the registering/insertion of a user into the database. User.register provided by passport
    register: function (req, res) {
        User.register(new User(
            { 
                username: req.body.username, 
                first_name: req.body.fName,
                last_name: req.body.lName,
                email: req.body.email
            }), 
            req.body.password, function (err, user) {
            if (err) {
                console.log(err);
                return res.render('pages/registration');
            }
            // Logs user in upon successful registration
            passport.authenticate("local")(req, res, function() {
                console.log("User created: " + req.user);
                res.redirect("/");
            })
        });
    },

}