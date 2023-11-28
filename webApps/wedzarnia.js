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
            var currentDate = new Date("2023-11-23T23:00:00.000Z");
            var formatOptions = { 
                day:    '2-digit', 
                month:  '2-digit', 
                year:   'numeric',
                hour12: false 
         };
         currentDate = currentDate.toLocaleDateString('pl-PL',formatOptions);
            var comparison = (lastDate === currentDate);
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