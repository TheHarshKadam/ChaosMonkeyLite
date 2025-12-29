exports.delay = (req, res, next, config) => {
    const delayMs =
        Math.floor(Math.random() * (config.maxDelay - config.minDelay)) +
        config.minDelay;

    console.log(`⏱ DELAY INJECTED: ${delayMs}ms`);
    res.setHeader('X-Chaos-Type', 'delay');
    setTimeout(next, delayMs);
};

exports.error = (req, res) => {
    console.log('💥 500 ERROR INJECTED');
    res.setHeader('X-Chaos-Type', 'error');
    return res.status(500).json({ error: 'CHAOS 500 ERROR' });
};

exports.timeout = (req, res) => {
    console.log('⏳ TIMEOUT INJECTED (request will hang)');
    res.setHeader('X-Chaos-Type', 'timeout');
    next();
};

exports.cpuSpike = (req, res, next) => {
    console.log('🔥 CPU SPIKE INJECTED');
    res.setHeader('X-Chaos-Type', 'cpuSpike');
    const start = Date.now();
    while (Date.now() - start < 2000) { }
    next();
};

exports.randomStatus = (req, res) => {
    const codes = [400, 401, 403, 502, 503];
    const code = codes[Math.floor(Math.random() * codes.length)];
    console.log(`🎲 RANDOM STATUS INJECTED: ${code}`);
    res.setHeader('X-Chaos-Type', 'randomStatus');
    return res.status(code).json({ error: `CHAOS ${code}` });
};

exports.partialResponse = (req, res) => {
    console.log('🧩 PARTIAL RESPONSE INJECTED');
    res.setHeader('X-Chaos-Type', 'partialResponse');
    return res.json({ data: null });
};

exports.memoryLeak = (req, res, next) => {
    console.log('🧠 MEMORY LEAK INJECTED');
    res.setHeader('X-Chaos-Type', 'memoryLeak');
    global.leak = global.leak || [];
    global.leak.push(new Array(1e6).fill('*'));
    next();
};