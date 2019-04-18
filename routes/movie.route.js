const express = require('express');
const router = express.Router();

// Require the controllers
const movie_controller = require('../controllers/movie.controller');

router.post('/search', movie_controller.search);

module.exports = router;