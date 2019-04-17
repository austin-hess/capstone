const express                             = require('express'),
      User                                = require('../models/user.model'),
      router                              = express.Router(),
      passport                            = require('passport'),
      index_controller                    = require('../controllers/index.controller');

const auth = require('../middleware/auth'),
      isLoggedIn = auth.isLoggedIn;

router.get('/', index_controller.get_page_index);

router.get('/registration', index_controller.get_page_registration);
  
module.exports = router;