var mongoose = require('mongoose'),
    Movie = require('../models/movie.model'),
    User = require('../models/user.model');

module.exports = {

    get_page_index: async function (req, res) {
        
        res.render('pages/index', {user : req.user});
    },

    get_page_registration: function (req, res) {
        res.render('pages/registration', {user : req.user});
    },

    get_page_login: function (req, res) {
        res.render('pages/login', {user : req.user});
    },

    get_page_recommendations: async function (req, res) {
        // get list of predictions for user
        var recommendations = [];
        if (req.user.predictions.length > 0) {
            recommendations = await Movie.find({'_id': { $in: req.user.predictions}});
        }
        res.render('pages/recommendations', {user: req.user, recommendations:recommendations});
    }

}