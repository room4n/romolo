const express = require('express');
const server = express();
const wedzarniaRoutes = require('./webApps/wedzarnia');

server.use('/wedzarnia', wedzarniaRoutes);

module.exports = server;