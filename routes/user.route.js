/* user.route.js - Defines user object related routes
    - Routes dealing with actions that interact with user objects
    - User profile route

    Author: Austin Hess
*/

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth'),
      isLoggedIn = auth.isLoggedIn;

// Require the controllers
const user_controller = require('../controllers/user.controller');

//router.put('/:id/update', user_controller.update_user);

//router.delete('/:id/delete', user_controller.delete_user);

router.get('/profile', user_controller.get_user_profile);


module.exports = router;