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
/* wedzarniaRoutes.post('/addEntry',jsonParser, (req,res,next)=>{
    var status;
    var formatOptions = { 
        day:    '2-digit', 
        month:  '2-digit', 
        year:   'numeric',
        hour:   '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
    }; */
    
    //var resultat = await getLastSmoke();
    //var smokeID = resultat.smokeID;
    //var lastDate = resultat.lastDate;
  
   /*  var data = connection.query("select id, date from SmokeDay ORDER BY id DESC LIMIT 1",(err,result)=>{
        if(err){
            res.send(err.message);
        } else {
            var smokeID = result[0].id;
            var lastDate = new Date(JSON.parse(JSON.stringify(result[0].date))).toLocaleDateString('pl-PL',formatOptions);
            var currentDate = new Date().toLocaleDateString('pl-PL',formatOptions).split(', ')[0];
            var currentTime = new Date().toLocaleDateString('pl-PL',formatOptions).split(', ')[1];

             res.status(200).json({
                last: lastDate,
                curr: currentDate,
                currTime: currentTime,
                id: smokeID,
                bottomTemp: req.body.tempBottom,
                status: status
            })       
        }
    });  */
         //if dates are same
            //if(lastDate != currentDate){
                //add entry with the same smoke id
                //insertEntry(smokeID, currentTime ,req.body.tempBottom, req.body.tempTop,req.body.prod1Temp,req.body.prod2Temp);
               /*  connection.query("insert into Entries (smokeID, dateTime, tempBottom, tempTop, product1Temp, product2Temp) values ('"+smokeID+"','"+currentTime+"','"+req.body.tempBottom+"','"+req.body.tempTop+"','"+req.body.prod1Temp+"','"+req.body.prod2Temp+"')",(err,result)=>{
                    if(err){
                        res.send(err.message);
                        status = false;
                    } else {
                        status = true;
                    }
                }) */
            //} else {
                //create new smoke id entry 
                //add entry with new smoke id
            //}
            
//});
async function getLastSmoke(){
    connection.query("select id, date from SmokeDay ORDER BY id DESC LIMIT 1",(err,result)=>{
        if(err){
            return err.message;
        } else {
           return {
                smokeID : result[0].id,
                lastDate : new Date(JSON.parse(JSON.stringify(result[0].date))).toLocaleDateString('pl-PL',formatOptionsDate)
            }
        }
    });
}

Routes.post('/addEntry',jsonParser, async (req,res,next)=>{
    var last = await getLastEntry();
    res.status(200).json({
        lastEntry: last
    })
});

async function getLastEntry(){
    connection.query("select id from Entries ORDER BY id DESC LIMIT 1",(err,result)=>{
        if(err){
            return err.message;
        } else {
            var smokeID = result[0].id;
            return smokeID;
        }
    }
)};

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