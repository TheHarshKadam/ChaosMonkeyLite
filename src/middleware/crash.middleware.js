const { applyChaos } = require('../chaos/chaos-engine.js');
module.exports = (req, res, next)=>{
    applyChaos(req, res, next);
}