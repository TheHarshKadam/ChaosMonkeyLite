exports.delay = async(req, res, next)=>{
    const delayMs = Math.floor(Math.random()*3000)+1000;
    console.log(`INJECTING DELAY OF ${delayMs} MS!!`);
    setTimeout(()=>{
        next();
    }, delayMs);
};

exports.error = (req, res)=>{
    console.log('INJECTING 500 ERROR!!!');
    res.status(500).json({
        error: 'INJECTING CHAOS ERROR XD'
    });
};