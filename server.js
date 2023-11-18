const express = require('express');
const path = require('path');

const server = express();

const wedzarniaRoutes = require('./webApps/wedzarnia');

server.use('/wedzarnia', express.static(path.join(__dirname + '/client/wedzarnia/build')));
server.use('/wedzarnia/api', wedzarniaRoutes);
module.exports = server;