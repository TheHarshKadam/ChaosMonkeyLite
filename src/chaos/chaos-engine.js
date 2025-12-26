const chaosTypes = require('./chaos-types.js')
const chaosConfig = require('./chaos-config.js')

exports.applyChaos = (req, res, next) => {
    if (!chaosConfig.enabled || chaosConfig.killSwitch) {
        return next();
    }
    for (const [type, config] of Object.entries(chaosConfig)) {
        if (!config?.enabled || !config?.probability) {
            continue;
        }
        if (Math.random() < config.probability) {
            const chaosFunc = chaosTypes[type];
            if (chaosFunc) {
                return chaosFunc(req, res, next, config);
            }
        }
    }
    next();
}