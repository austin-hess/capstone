const express                             = require('express'),
      router                              = express.Router(),
      passport                            = require('passport'),
      auth_controller                     = require('../controllers/auth.controller');

const auth = require('../middleware/auth'),
      isLoggedIn = auth.isLoggedIn;

router.get('/logout', auth_controller.logout);

router.post('/register', auth_controller.register);

router.post('/login', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"  
}), (req, res) => { });

module.exports = router;