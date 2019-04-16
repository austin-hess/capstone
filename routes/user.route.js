const express = require('express');
const router = express.Router();

// Require the controllers
const user_controller = require('../controllers/user.controller');

router.get('/test', user_controller.test);

router.post('/create', user_controller.user_create);

router.get('/:id', user_controller.get_user);

router.put('/:id/update', user_controller.update_user);

router.delete('/:id/delete', user_controller.delete_user);

module.exports = router;