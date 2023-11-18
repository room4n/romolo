const express = require('express');
const path = require('path');

const server = express();

const wedzarniaRoutes = require('./webApps/wedzarnia');

server.use('/', express.static('/client/wedzarnia/build'));
server.use('/wedzarnia/api', wedzarniaRoutes);
module.exports = server;