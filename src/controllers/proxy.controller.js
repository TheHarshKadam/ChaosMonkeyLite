const fetch = require('node-fetch');

exports.proxyRequest = async (req, res) => {
    const targetUrl = req.body.url;

    if (!targetUrl) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        new URL(targetUrl);
    } catch (err) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    try {
        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 10000
        });

        const data = await response.text();

        res.json({
            success: true,
            status: response.status,
            url: targetUrl,
            contentLength: data.length,
            preview: data.substring(0, 500)
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};