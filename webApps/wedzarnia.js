const express = require('express');
const bodyParser = require('body-parser');

const wedzarniaRoutes = express.Router();
const connection = require("../config/database");

var jsonParser = bodyParser.json();

wedzarniaRoutes.get('/', async (req,res,next)=>{
    var entries = await getEntriesBySmokeDay(4);
    res.send(entries);
});
wedzarniaRoutes.get('/getEntries',jsonParser, async (req,res,next)=>{
    if(req.body){
        var entries = await getAllEntries();
    }else {
        var entries = await getEntriesBySmokeDay(req.body.id);
        res.send(entries);
    }
})

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
        var temp = await getLastSmokeDay();
        data.smokeID = temp.id;
    }
    status = await insertEntry(data);
    res.status(200).json({
        lastSmokeDate : lastSmokeDate,
        currentdate: currentDate,
        smokeID: data.smokeID,
        status: status
    })
});

//SmokeDays
async function getAllSmokeDays(){
    return new Promise((resolve,reject)=>{
        connection.query("select * from SmokeDay",(err,result)=>{
            if(err){
                return reject(err.message);
            } else {
                return resolve(result);
            }
        })
    })
}
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
async function insertNewSmokeDay(dateTime){
    dataSet = {date:dateTime};
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
//Entries
async function getEntriesBySmokeDay(id){
    var dataSet = {
        smokeID : id
    }
    return new Promise((resolve,reject)=>{
        connection.query("select * from Entries where ?",dataSet,(err,result)=>{
            if (err){
                return reject(err.message);
            } else {
                return resolve(result);
            }
        })
    })
}
async function getAllEntries(){
    return new Promise((resolve,reject)=>{
        connection.query("select * from Entries",(err,result)=>{
            if (err){
                return reject(err.message);
            } else {
                return resolve(result);
            }
        })
    })
}
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


module.exports = wedzarniaRoutes;