const express                             = require('express'),
      User                                = require('../models/user.model'),
      router                              = express.Router();

router.get('/', function (req, res) {
    res.render('pages/index', {user: req.user });
});

router.get('/register', function(req, res) {
    res.render('pages/register', { });
});

router.post('/register', function (req, res) {
    
});

router.get('/login', function (req, res) {
    res.render('pages/login', {user: req.user});
});

router.post('/login', function (req, res) {
    
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/current', (req, res, next) => {
    
});
  
module.exports = router;