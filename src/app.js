const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    exposedHeaders: ['X-Chaos-Type']
}));
app.use(express.json());
app.use(express.static('public'));

const testRoutes = require('./routes/test.routes.js');
const chaosRoutes = require('./routes/chaos.routes.js');
const proxyRoutes = require('./routes/proxy.routes.js');

app.use('/test', testRoutes);
app.use('/chaos', chaosRoutes);
app.use('/proxy', proxyRoutes);

module.exports = app;