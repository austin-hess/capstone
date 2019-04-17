var express                         = require('express'),
    User                            = require('../models/user.model');

module.exports = {

    get_page_index: function (req, res) {
        res.render('pages/index', {user : req.user});
    },

    get_page_registration: function (req, res) {
        res.render('pages/registration');
    },

    get_page_login: function (req, res) {
        res.render('pages/login');
    }

}