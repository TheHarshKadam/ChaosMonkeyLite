const chaosTypes = require('./chaos-types.js')

exports.applyChaos = async(req, res, next)=>{
    const random = Math.random();

    if (random<0.5){
        return chaosTypes.delay(req, res, next);
    }
    if (random<0.3){
        return chaosTypes.error(req, res);
    }
    next();
}