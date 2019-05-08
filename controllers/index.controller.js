/* index.controller.js - Navigation controller functions
    - navigation functions
    - get home page
    - get registration page
    - get login page
    - get recommendations page

    Author: Austin Hess
*/

var mongoose = require('mongoose'),
    Movie = require('../models/movie.model'),
    User = require('../models/user.model'),
    request = require('request-promise');

module.exports = {

    // Gets the homepage and renders the list of movies from the database
    // Renders the page index.ejs with the current user object and results from querying all movies
    get_page_index: async function (req, res) {
        Movie.find({}).sort('title').exec(function(err, results) {
            if (err) {
                return res.send(err);
            }

            res.render('pages/index', {user: req.user, movies: results});
        });
    },

    // Gets the registration page
    // Renders the page registration.ejs with the current user object (should always be null because this link not visible to logged in users)
    get_page_registration: function (req, res) {
        res.render('pages/registration', {user : req.user});
    },

    // Gets the login page
    // Renders the page login.ejs with the current user object (should always be null because this link not visible to logged in users)
    get_page_login: function (req, res) {
        res.render('pages/login', {user : req.user});
    },

    // Gets the recommendation page - for logged in users only
    // Makes a callout with the request module to the recommendation service
    // Uses the results of the callout to query the respective movies from the database
    // Renders the page recommendations.ejs with the current user object and the list of recommendations returned from the HTTP callout to the recommendation service
    get_page_recommendations: async function (req, res) {
        // get list of predictions for user

        /* IMPORTANT: This is the variable that needs to reflect the host and port of the running recommender */
        var endpoint = 'http://ibcf-service.ml/calculate/';
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

        var pred_val = await request(endpoint + String(req.user._id));

        var pred_arr = [];
        var pred_ins = '';
        for (var i = 0; i < pred_val.length; i++) {
            if (pred_val[i] == '[') {
                i++;
                pred_ins += pred_val[i];
            } else if (pred_val[i] == ',' || pred_val[i] == ']') {
                pred_arr.push(Number(pred_ins));
                pred_ins = '';
            } else if (pred_val[i] == ' ') {
                i++;
                pred_ins += pred_val[i];
            } else {
                pred_ins += pred_val[i];
            }
        }

        console.log(pred_arr);

        var recommendations = [];
        recommendations = await Movie.find({'ml_id': {$in: pred_arr}}).exec();
        
        res.render('pages/recommendations', {user: req.user, movies:recommendations});
    }

}