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
    var formatOptionsDate = { 
        day:    '2-digit', 
        month:  '2-digit', 
        year:   'numeric',
        hour12: false 
 };
 var formatOptionsTime = { 
    hour:   '2-digit', 
    minute: '2-digit',
    hour12: false 
};
    connection.query("select id, date from SmokeDay ORDER BY id DESC LIMIT 1",(err,result)=>{
        if(err){
            res.send(err.message)
        } else {
            var smokeID = result[0].id;
            var lastDate = new Date(JSON.parse(JSON.stringify(result[0].date))).toLocaleDateString('pl-PL',formatOptionsDate);
            var currentDate = new Date().toLocaleDateString('pl-PL',formatOptionsDate);
            //var currentTime = new Date().toLocaleDateString('pl-PL',formatOptionsTime);
            
         //if dates are same
            if(lastDate == currentDate){
                //add entry with the same smoke id
                //insertEntry(smokeID, currentTime ,req.body.tempBottom, req.body.tempTop,req.body.prod1Temp,req.body.prod2Temp);
            } else {
                //create new smoke id entry 
                //add entry with new smoke id
            }
            res.status(200).json({
                last: lastDate,
                curr: currentDate,
                currTime: currentDate.toLocaleDateString('pl-PL',formatOptionsTime),
                id: smokeID,
                bottomTemp: req.body.tempBottom
            })
        }
    });
   
    
});

function insertEntry(entryID, time, tempBottom, tempTop, prod1Temp, prod2Temp){

};
module.exports = wedzarniaRoutes;