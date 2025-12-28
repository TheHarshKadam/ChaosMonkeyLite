const { useState, useEffect } = React;
const AlertCircle = () => <i data-lucide="alert-circle"></i>;
const ServerCrash = ({ className }) => <i data-lucide="server-crash" className={className}></i>;
const Settings = ({ className }) => <i data-lucide="settings" className={className}></i>;
const Activity = ({ className }) => <i data-lucide="activity" className={className}></i>;

const API_BASE = 'http://localhost:3000';


//IF BACKEND FAILS TO CONNECT DEMO CONFIGURATION RUNS
const DEMO_CONFIG = {
    enabled: true,
    killSwitch: false,
    delay: { enabled: true, probability: 0.3, minDelay: 500, maxDelay: 3000 },
    error: { enabled: true, probability: 0.3 },
    timeout: { enabled: true, probability: 0.1 },
    cpuSpike: { enabled: true, probability: 0.1 },
    memoryLeak: { enabled: true, probability: 0.05 },
    randomStatus: { enabled: true, probability: 0.1 },
    partialResponse: { enabled: true, probability: 0.05 }
};

function ChaosControlPanel() {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [testing, setTesting] = useState(false);
    const [testResult, setTestResult] = useState(null);
    const [demoMode, setDemoMode] = useState(false);
    const [connectionError, setConnectionError] = useState(null);

    useEffect(() => {
        fetchConfig();
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, []);

    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    });

    const fetchConfig = async () => {
        try {
            const res = await fetch(`${API_BASE}/chaos/config`);
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setConfig(data.chaosConfig);
            setDemoMode(false);
            setConnectionError(null);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch config:', err);
            setConnectionError(err.message);
            setConfig(DEMO_CONFIG);
            setDemoMode(true);
            setLoading(false);
        }
    };

    const updateConfig = async (updates) => {
        if (demoMode) {
            setConfig({ ...config, ...updates });
            return;
        }
        try {
            const res = await fetch(`${API_BASE}/chaos/config`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
            const data = await res.json();
            setConfig(data.chaosConfig);
        } catch (err) {
            console.error('Failed to update config:', err);
        }
    };

    const killSwitch = async () => {
        if (demoMode) {
            setConfig({ ...config, killSwitch: true });
            return;
        }
        try {
            await fetch(`${API_BASE}/chaos/kill`, { method: 'POST' });
            await fetchConfig();
        } catch (err) {
            console.error('Failed to activate kill switch:', err);
        }
    };

    const reviveChaos = async () => {
        if (demoMode) {
            setConfig({ ...config, killSwitch: false });
            return;
        }
        try {
            await fetch(`${API_BASE}/chaos/revive`, { method: 'POST' });
            await fetchConfig();
        } catch (err) {
            console.error('Failed to revive chaos:', err);
        }
    };

    const testEndpoint = async () => {
        if (demoMode) {
            setTesting(true);
            setTestResult(null);
            setTimeout(() => {
                setTestResult({
                    success: true,
                    status: 200,
                    duration: 1234,
                    data: { success: true, data: ["Alice", "Bob", "Charlie"] }
                });
                setTesting(false);
            }, 1500);
            return;
        }

        setTesting(true);
        setTestResult(null);
        try {
            const start = Date.now();
            const res = await fetch(`${API_BASE}/test/users`);
            const duration = Date.now() - start;
            const data = await res.json();
            setTestResult({
                success: res.ok,
                status: res.status,
                duration,
                data
            });
        } catch (err) {
            setTestResult({
                success: false,
                error: err.message
            });
        }
        setTesting(false);
    };

    const toggleEnabled = (type) => {
        updateConfig({
            [type]: { ...config[type], enabled: !config[type].enabled }
        });
    };

    const updateProbability = (type, value) => {
        updateConfig({
            [type]: { ...config[type], probability: parseFloat(value) }
        });
    };

    if (loading || !config) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }

    const chaosTypes = [
        { key: 'delay', icon: '⏱', name: 'Delay', color: 'from-blue-500 to-cyan-500' },
        { key: 'error', icon: '💥', name: '500 Error', color: 'from-red-500 to-pink-500' },
        { key: 'timeout', icon: '⏳', name: 'Timeout', color: 'from-yellow-500 to-orange-500' },
        { key: 'cpuSpike', icon: '🔥', name: 'CPU Spike', color: 'from-orange-500 to-red-500' },
        { key: 'memoryLeak', icon: '🧠', name: 'Memory Leak', color: 'from-purple-500 to-pink-500' },
        { key: 'randomStatus', icon: '🎲', name: 'Random Status', color: 'from-green-500 to-teal-500' },
        { key: 'partialResponse', icon: '🧩', name: 'Partial Response', color: 'from-indigo-500 to-purple-500' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold text-white mb-4 flex items-center justify-center gap-4">
                        <ServerCrash className="w-16 h-16 text-yellow-400" />
                        CHAOS MONKEY LITE
                    </h1>
                    <p className="text-purple-300 text-xl">Chaos Engineering Control Panel</p>

                    {demoMode && (
                        <div className="mt-4 inline-block bg-yellow-500/20 border border-yellow-500 rounded-lg px-4 py-2">
                            <p className="text-yellow-300 text-sm">
                                ⚠️ Demo Mode - Backend not connected
                            </p>
                            <button
                                onClick={fetchConfig}
                                className="text-yellow-200 text-xs underline mt-1"
                            >
                                Try reconnecting
                            </button>
                        </div>
                    )}
                </div>

                {/* Master Controls */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-white font-semibold flex items-center gap-2">
                                <Settings className="w-5 h-5" />
                                Master Enable
                            </span>
                            <button
                                onClick={() => updateConfig({ enabled: !config.enabled })}
                                className={`w-14 h-8 rounded-full transition-all ${config.enabled ? 'bg-green-500' : 'bg-gray-600'
                                    }`}
                            >
                                <div
                                    className={`w-6 h-6 bg-white rounded-full transition-transform ${config.enabled ? 'translate-x-7' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>
                        <p className="text-sm text-gray-300">
                            {config.enabled ? 'Chaos is active' : 'Chaos is disabled'}
                        </p>
                    </div>

                    <button
                        onClick={config.killSwitch ? reviveChaos : killSwitch}
                        className={`${config.killSwitch
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                                : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
                            } text-white rounded-2xl p-6 font-bold text-lg transition-all transform hover:scale-105 shadow-lg`}
                    >
                        <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                        {config.killSwitch ? '🟢 REVIVE CHAOS' : '🚨 KILL SWITCH'}
                    </button>

                    <button
                        onClick={testEndpoint}
                        disabled={testing}
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-2xl p-6 font-bold text-lg transition-all transform hover:scale-105 shadow-lg disabled:opacity-50"
                    >
                        <Activity className="w-8 h-8 mx-auto mb-2" />
                        {testing ? 'TESTING...' : 'TEST ENDPOINT'}
                    </button>
                </div>

                {/* Test Result */}
                {testResult && (
                    <div className={`mb-8 p-6 rounded-2xl border-2 ${testResult.success
                            ? 'bg-green-500/20 border-green-500'
                            : 'bg-red-500/20 border-red-500'
                        }`}>
                        <div className="text-white">
                            <div className="font-bold text-xl mb-2">
                                {testResult.success ? '✅ Success' : '❌ Failed'}
                            </div>
                            {testResult.status && (
                                <div>Status: {testResult.status} | Duration: {testResult.duration}ms</div>
                            )}
                            {testResult.error && <div>Error: {testResult.error}</div>}
                            {testResult.data && (
                                <pre className="mt-2 text-sm bg-black/30 p-3 rounded overflow-auto">
                                    {JSON.stringify(testResult.data, null, 2)}
                                </pre>
                            )}
                        </div>
                    </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {chaosTypes.map(({ key, icon, name, color }) => {
                        const chaosConfig = config[key];
                        if (!chaosConfig) return null;

                        return (
                            <div
                                key={key}
                                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-2xl`}>
                                            {icon}
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-lg">{name}</h3>
                                            <p className="text-gray-400 text-sm">
                                                {(chaosConfig.probability * 100).toFixed(0)}% chance
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleEnabled(key)}
                                        className={`w-12 h-7 rounded-full transition-all ${chaosConfig.enabled ? 'bg-green-500' : 'bg-gray-600'
                                            }`}
                                    >
                                        <div
                                            className={`w-5 h-5 bg-white rounded-full transition-transform ${chaosConfig.enabled ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-300">Probability</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.05"
                                        value={chaosConfig.probability}
                                        onChange={(e) => updateProbability(key, e.target.value)}
                                        className="w-full accent-purple-500"
                                        disabled={!chaosConfig.enabled}
                                    />
                                </div>

                                {key === 'delay' && chaosConfig.minDelay && (
                                    <div className="mt-3 text-xs text-gray-400">
                                        {chaosConfig.minDelay}ms - {chaosConfig.maxDelay}ms
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<ChaosControlPanel />, document.getElementById('root'));