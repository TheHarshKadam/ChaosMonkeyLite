const express = require('express')
const app = express();
//const testRoutes = require('./routes/test.routes.js');
const chaosRoutes = require('./routes/chaos.routes.js');

app.use(express.json());
app.use('/chaos', chaosRoutes);


module.exports = app;