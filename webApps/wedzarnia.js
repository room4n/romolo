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
    
    connection.query("select id, date from SmokeDay ORDER BY id DESC LIMIT 1",(err,result)=>{
        if(err){
            res.send(err.message)
        } else {
            var lastDate = new Date(JSON.parse(JSON.stringify(result[0].date)));
            var smokeID = result[0].id;
            var currentDate = new Date();
            var formatOptions = { 
                day:    '2-digit', 
                month:  '2-digit', 
                year:   'numeric',
                //hour:   '2-digit', 
                //minute: '2-digit',
                hour12: false 
         };
         currentDate = currentDate.toLocaleDateString('pl-PL',formatOptions);
         lastDate = lastDate.toLocaleDateString('pl-PL',formatOptions);
         //if dates are same
            if(lastDate == currentDate){
                
            } else {

            }
            res.status(200).json({
                last: lastDate,
                curr: currentDate,
                id: smokeID,
                comp: comparison
            })
        }
    });
    //compare todays date with last smoke day date
    
    //var isSameDay = (lastSmokeDate == currentDay);
    
})

module.exports = wedzarniaRoutes;