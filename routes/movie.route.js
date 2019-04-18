const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth'),
      isLoggedIn = auth.isLoggedIn;

// Require the controllers
const movie_controller = require('../controllers/movie.controller');

router.post('/search', movie_controller.search);

router.get('/list', movie_controller.get_movie_list);

router.get('/:id', isLoggedIn, movie_controller.get_movie);

router.post('/rate', movie_controller.rate_movie);

module.exports = router;