const express = require('express');
const bodyParser = require('body-parser');

const wedzarniaManager = express.Router();
const connection = require("../config/database");

var jsonParser = bodyParser.json();


wedzarnia.get('/', async (req,res,next)=>{
    res.status(200).json({
        message: "Wedzarnia manager"
    })
});


module.exports = wedzarnia;