exports.delay = (req, res, next, config) => {
    const delayMs =
        Math.floor(Math.random() * (config.maxDelay - config.minDelay)) +
        config.minDelay;

    console.log(`⏱ DELAY INJECTED: ${delayMs}ms`);
    setTimeout(next, delayMs);
};

exports.error = (req, res) => {
    console.log('💥 500 ERROR INJECTED');
    return res.status(500).json({ error: 'CHAOS 500 ERROR' });
};

exports.timeout = () => {
    console.log('⏳ TIMEOUT INJECTED (request will hang)');
    return;
};

exports.cpuSpike = () => {
    console.log('🔥 CPU SPIKE INJECTED');
    const start = Date.now();
    while (Date.now() - start < 2000) { }
    return;
};

exports.randomStatus = (req, res) => {
    const codes = [400, 401, 403, 502, 503];
    const code = codes[Math.floor(Math.random() * codes.length)];
    console.log(`🎲 RANDOM STATUS INJECTED: ${code}`);
    return res.status(code).json({ error: `CHAOS ${code}` });
};

exports.partialResponse = (req, res) => {
    console.log('🧩 PARTIAL RESPONSE INJECTED');
    return res.json({ data: null });
};

exports.memoryLeak = () => {
    console.log('🧠 MEMORY LEAK INJECTED');
    global.leak = global.leak || [];
    global.leak.push(new Array(1e6).fill('*'));
    return;
};
