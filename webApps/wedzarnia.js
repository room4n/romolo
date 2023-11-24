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
    
    //get last smoke id date
    var lastSmokeDate;
    
    connection.query("select (date AS DATE) from SmokeDay ORDER BY id DESC LIMIT 1",(err,result)=>{
        if(err){
            res.send(err.message)
        } else {
            
            res.status(200).json({
                message: {
                    last: result[0].date
                } 
            })
        }
    });
    //compare todays date with last smoke day date
    
    //var isSameDay = (lastSmokeDate == currentDay);
    
})

module.exports = wedzarniaRoutes;