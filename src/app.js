const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static('public'));

const testRoutes = require('./routes/test.routes.js');
const chaosRoutes = require('./routes/chaos.routes.js');

app.use('/test', testRoutes);
app.use('/chaos', chaosRoutes);

module.exports = app;