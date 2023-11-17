const express = require('exporess');
const server = express();
const wedzarniaRoutes = require('./webApps/wedzarnia');

server.use('/wedzarnia', wedzarniaRoutes);

module.exports = server;