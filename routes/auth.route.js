/* auth.route.js - Exports the authorization router
    - Handles main authentication routes
    - Logout route
    - Register route
    - Login route

    Author: Austin Hess
*/

const express                             = require('express'),
      router                              = express.Router(),
      passport                            = require('passport'),
      auth_controller                     = require('../controllers/auth.controller');  // include the auth.controller for necessary functions

const auth = require('../middleware/auth'),
      isLoggedIn = auth.isLoggedIn;

/* Requires that a user is currently authenticated */
router.get('/logout', isLoggedIn, auth_controller.logout);

router.post('/register', auth_controller.register);

router.post('/login', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"  
}), (req, res) => { });

module.exports = router;