const express = require('express');
const bodyParser = require('body-parser');

const wedzarniaRoutes = express.Router();
const connection = require("../config/database");

var jsonParser = bodyParser.json();

wedzarniaRoutes.get('/', (req,res,next)=>{
    connection.query("select * from Entries",(err,result)=>{
        if(err){
            res.send(err.message)
        } else {
            res.send(result)
        }
    })
});
wedzarniaRoutes.post('/addEntry',jsonParser,(req,res,next)=>{
    var status;
    var formatOptionsDate = { 
        day:    '2-digit', 
        month:  '2-digit', 
        year:   'numeric',
        hour12: false 
    };
    var formatOptionsTime = { 
        hour:   '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
    };
    var smokeID;
    var lastDate;
    var currentDate;
    var currentTime;

    connection.query("select id, date from SmokeDay ORDER BY id DESC LIMIT 1",(err,result)=>{
        if(err){
            res.send(err.message)
        } else {
            smokeID = result[0].id;
            lastDate = new Date(JSON.parse(JSON.stringify(result[0].date))).toLocaleDateString('pl-PL',formatOptionsDate);
            currentDate = new Date().toLocaleDateString('pl-PL',formatOptionsDate);
            currentTime = new Date().toLocaleDateString('pl-PL',formatOptionsTime).split(', ')[1];
        }});
        connection.end();

         //if dates are same
            if(lastDate != currentDate){
                //add entry with the same smoke id
                //insertEntry(smokeID, currentTime ,req.body.tempBottom, req.body.tempTop,req.body.prod1Temp,req.body.prod2Temp);
                connection.query("insert into Entries (smokeID, dateTime, tempBottom, tempTop, product1Temp, product2Temp) values ('"+smokeID+"','"+currentTime+"','"+req.body.tempBottom+"','"+req.body.tempTop+"','"+req.body.prod1Temp+"','"+req.body.prod2Temp+"')",(err,result)=>{
                    if(err){
                        res.send(err.message);
                        status = false;
                    } else {
                        status = true;
                    }
                });
                connection.end();
            } else {
                //create new smoke id entry 
                //add entry with new smoke id
            }
            res.status(200).json({
                last: lastDate,
                curr: currentDate,
                currTime: currentTime,
                id: smokeID,
                bottomTemp: req.body.tempBottom,
                status: status
            })
        });

/* function insertEntry(entryID, time, tempBottom, tempTop, prod1Temp, prod2Temp){
    connection.query("insert into Entries (smokeID, dateTime, tempBottom, tempTop, product1Temp, product2Temp) values ("+entryID+","+timr+","+tempBottom+","+tempTop+","+prod1Temp+","+prod2Temp+")",(err,result)=>{
        if(err){
            res.send(err.message);
        } else {
            res.status(200).json({
                message: "inserted"
            })
        }
    })
}; */
module.exports = wedzarniaRoutes;