const express = require('express');
const path = require('path');
const cors = require('cors');

const server = express();

const wedzarnia = require('./webApps/wedzarnia');
const wedzarniaManager = require('./webApps/wedzarniaManager');

server.use(cors());
server.use('/wedzarnia', express.static(path.join(__dirname + '/client/wedzarnia/build')));
server.use('/wedzarnia/api', wedzarnia);
server.use('/wedzarnia/manager', wedzarniaManager);
module.exports = server;