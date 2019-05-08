/* index.route.js - Contains the route definitions for core navigation routes on the application
    - Core navigation routes
    - Homepage route
    - Registration page route
    - Login page route
    - Recommendations page route

    Author: Austin Hess
*/

const express                             = require('express'),
      User                                = require('../models/user.model'),
      router                              = express.Router(),
      passport                            = require('passport'),
      index_controller                    = require('../controllers/index.controller'); // include the index.controller for necessary functions

const auth = require('../middleware/auth'),
      isLoggedIn = auth.isLoggedIn;

router.get('/', index_controller.get_page_index);

router.get('/registration', index_controller.get_page_registration);

router.get('/login', index_controller.get_page_login);

/* Requires that a user is currently authenticated */
router.get('/recommendations', isLoggedIn, index_controller.get_page_recommendations);
  
module.exports = router;