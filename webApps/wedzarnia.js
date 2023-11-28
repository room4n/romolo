const express = require('express');
const bodyParser = require('body-parser');

const wedzarniaRoutes = express.Router();
const connection = require("../config/database");

var jsonParser = bodyParser.json();


wedzarniaRoutes.get('/', (req,res,next)=>{
    connection.query("select * from Products",(err,result)=>{
        if(err){
            res.send(err.message)
        } else {
            res.send(result)
        }
    })
});
wedzarniaRoutes.post('/addEntry',jsonParser,(req,res,next)=>{
    
    connection.query("select date from SmokeDay ORDER BY id DESC LIMIT 1",(err,result)=>{
        if(err){
            res.send(err.message)
        } else {
            var lastDate = new Date(JSON.parse(JSON.stringify(result[0].date)));
            var currentDate = new Date();
            var comparison = (lastDate == currentDate);
            res.status(200).json({
                last: lastDate,
                curr: currentDate,
                comp: comparison
            })
        }
    });
    //compare todays date with last smoke day date
    
    //var isSameDay = (lastSmokeDate == currentDay);
    
})

module.exports = wedzarniaRoutes;