const chaosConfig = require('../chaos/chaos-config.js');

exports.updateConfig = (req, res)=>{
    Object.assign(chaosConfig, req.body);
    res.json({success: true, chaosConfig});
}

exports.killSwitch = (req, res)=>{
    chaosConfig.killSwitch = true;
    res.json({message: '🚨 Kill switch activated'})
}

exports.reviveChaos = (req, res)=>{
    chaosConfig.killSwitch = false;
    res.json({ message: '🟢 Chaos resumed' });
}

exports.getConfig = (req, res)=>{
    res.json({chaosConfig});
}