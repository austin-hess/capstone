var mongoose = require('mongoose'),
    Movie = require('../models/movie.model'),
    User = require('../models/user.model'),
    request = require('request-promise');

module.exports = {

    get_page_index: async function (req, res) {
        Movie.find({}).sort('title').exec(function(err, results) {
            if (err) {
                return res.send(err);
            }

            res.render('pages/index', {user: req.user, movies: results});
        });
    },

    get_page_registration: function (req, res) {
        res.render('pages/registration', {user : req.user});
    },

    get_page_login: function (req, res) {
        res.render('pages/login', {user : req.user});
    },

    get_page_recommendations: async function (req, res) {
        // get list of predictions for user
        var pred_val = await request('http://ibcf-service.ml/calculate/' + String(req.user._id));

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