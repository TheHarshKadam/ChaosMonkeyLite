const express = require('express');
const router = express.Router();
const controller = require('../controllers/proxy.controller.js');
const crashMiddleware = require('../middleware/crash.middleware.js');

router.post('/fetch',
    crashMiddleware, 
    controller.proxyRequest
);

module.exports = router;