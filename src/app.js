const express = require('express')
const app = express();
const testRoutes = require('./routes/test.routes.js');

app.use(express.json());
app.use('/api', testRoutes);


module.exports = app;