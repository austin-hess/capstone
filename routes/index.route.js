const express                             = require('express'),
      User                                = require('../models/user.model'),
      router                              = express.Router();

const isLoggedIn = require('../middleware/auth').isLoggedIn;

router.get('/', (req, res) => {
    res.render('pages/index');
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/secret', isLoggedIn, function(req, res) {
    res.render('pages/secret');
});

router.get('/register', function (req, res) {
    res.render('pages/register');
});

router.get('/login', function (req, res) {
    res.render('pages/login');
});

router.post('/register', function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('pages/register');
        }
        // Logs user in
        passport.authenticate("local")(req, res, function() {
            res.redirect('/secret');
        })
    });
});

router.post('/login', passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"  
}), function (req, res) { });
  
module.exports = router;