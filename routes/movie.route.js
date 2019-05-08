/* movie.route.js - Defines movie object related routes
    - Routes dealing with actions that interact with movie objects
    - Movie search route
    - Movie detail route
    - Movie rate route

    Author: Austin Hess
*/

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth'),
      isLoggedIn = auth.isLoggedIn;

/* Require the controllers */
const movie_controller = require('../controllers/movie.controller');

router.post('/search', movie_controller.search);

/* Requires that a user is currently authenticated */
router.get('/:id', isLoggedIn, movie_controller.get_movie);

/* Requires that a user is currently authenticated */
router.post('/rate', isLoggedIn, movie_controller.rate_movie);

module.exports = router;