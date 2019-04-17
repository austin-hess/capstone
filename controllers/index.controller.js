var express                         = require('express'),
    User                            = require('../models/user.model');

module.exports = {

    get_page_index: function (req, res) {
        res.render('pages/index');
    },

    get_page_registration: function (req, res) {
        res.render('pages/registration');
    }

}