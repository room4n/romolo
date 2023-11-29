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

wedzarniaRoutes.post('/addEntry',jsonParser, async (req,res,next)=>{
    
    var formatOptions = { 
        day:    '2-digit', 
        month:  '2-digit', 
        year:   'numeric',
        hour:   '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
    };
    var currentDateTime = new Date();
    var status;

    var lastEntry = await getLastSmokeDay();
    var lastSmokeDate = new Date(JSON.parse(JSON.stringify(lastEntry.date))).toLocaleDateString('pl-PL',formatOptions).split(', ')[0];

    var currentDate = currentDateTime.toLocaleDateString('pl-PL',formatOptions).split(', ')[0];
    //var currentTime = currentDateTime.toLocaleDateString('pl-PL',formatOptions).split(', ')[1];

    var data = {
        smokeID:null, 
        dateTime:currentDateTime, 
        tempBottom:req.body.tempBottom, 
        tempTop:req.body.tempTop, 
        product1Temp:req.body.prod1Temp, 
        product2temp:req.body.prod2Temp
    };

    if(lastSmokeDate == currentDate){
        data.smokeID = lastEntry.id;
    } else {  
        status = await insertNewSmokeDay(currentDateTime);
        data.smokeID = await getLastSmokeDay().id;
    }
    status = await insertEntry(data);
    res.status(200).json({
        lastSmokeDate : lastSmokeDate,
        currentdate: currentDate,
        smokeID: data.smokeID,
        status: status
    })
});

async function getLastSmokeDay(){
    return new Promise((resolve, reject)=>{
        connection.query("select id, date from SmokeDay ORDER BY id DESC LIMIT 1",(err,result)=>{
            if(err){
                return reject(err.message);
            } else {
                return resolve({id:result[0].id,date:result[0].date});
            }
        })
    });
};

async function insertEntry(dataSet){
    return new Promise((resolve, reject)=>{
        connection.query("INSERT INTO Entries SET ?",dataSet,(err,result)=>{
            if (err){
                return reject(err.message);
            } else {
                return resolve("done");
            }
        })
    })
}
async function insertNewSmokeDay(dateTime){
    dataSet = {dateTime:dateTime};
    return new Promise((resolve,reject)=>{
        connection.query("INSERT INTO SmokeDay SET ?",dataSet,(err,result)=>{
            if(err){
                return reject(err.message);
            } else {
                return resolve("New smokeday created");
            }
        })
    })
}

module.exports = wedzarniaRoutes;