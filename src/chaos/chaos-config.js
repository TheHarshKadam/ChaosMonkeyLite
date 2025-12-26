module.exports = {
    enabled: true,
    killSwitch: false,
    delay: { enabled: true, probability: 0.3, minDelay: 500, maxDelay: 3000 },
    error: { enabled: true, probability: 0.3 },
    timeout: { enabled: true, probability: 0.1 },
    cpuSpike: { enabled: true, probability: 0.1 },
    memoryLeak: { enabled: true, probability: 0.05 },
    randomStatus: { enabled: true, probability: 0.1 },
    partialResponse: { enabled: true, probability: 0.05 },
}