const express = require('express');
const router = express.Router();

// Require the controllers
const movie_controller = require('../controllers/movie.controller');

router.post('/search', movie_controller.search);

router.get('/list', movie_controller.get_movie_list);

router.get('/:id', movie_controller.get_movie);

module.exports = router;