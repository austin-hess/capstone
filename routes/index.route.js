const express                             = require('express'),
      passport                            = require('passport'),
      User                                = require('../models/user.model'),
      router                              = express.Router();

router.get('/', function (req, res) {
    res.render('pages/index', {user: req.user });
});

router.get('/register', function(req, res) {
    res.render('pages/register', { });
});

router.post('/register', function (req, res) {
    User.register(new Account({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.fName,
        lastName: req.body.lName
    }, req.body.password, function(err, user) {
        if (err) {
            return res.render('register', {user: user});
        }

        passport.authenticate('local')(req, res, function() {
            res.redirect('/');
        });
    }));
});

router.get('/login', function (req, res) {
    res.render('login', {user: req.user});
});

router.get('/login', function (req, res) {
    res.redirect('/');
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function (req, res) {
    res.status(200).send("pong!");
});

module.exports = router;