const express = require('express');
const router = express.Router();
const controller = require('../controllers/test.controllers.js');

router.get('/users', 
    require('../middleware/crash.middleware.js'),
    controller.getUsers);

module.exports = router;