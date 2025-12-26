const router = require('express').Router();
const controller = require('../controllers/chaos.controller.js')

router.get('/config', controller.getConfig);
router.put('/config', controller.updateConfig);
router.post('/kill', controller.killSwitch);
router.post('/revive', controller.reviveChaos);

module.exports = router;