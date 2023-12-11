const express = require('express');
const bodyParser = require('body-parser');

const wedzarniaManager = express.Router();
const connection = require("../config/database");

var jsonParser = bodyParser.json();


wedzarniaManager.get('/', async (req,res,next)=>{
    res.status(200).json({
        message: "Wedzarnia manager"
    })
});

wedzarniaManager.post('/generateData',jsonParser, async (req,res,next)=>{
    var days = req.body.days;
    var entries = req.body.entries;

    for(var i = req.body.days; i>0; i--){
        var day = new Date();
        day.setDate(day.getDate()-i);
        await insertNewSmokeDay(day);
        for(var j = 0; j<req.body.entries; j++){
            var temp = await getLastSmokeDay();
            var data = {
                smokeID:temp.id, 
                dateTime:day.setMinutes(day.getMinutes()+j), 
                tempBottom:40+j+0.5, 
                tempTop:45+j*0.5, 
                product1Temp:34+j*1.5, 
                product2temp:34+j*1.7
            };

            await insertEntry(data);
        }
    }
    res.status(200).json({
        message: "Looks ok."
    });
})

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

wedzarniaManager.post('/deleteSmokeDay',jsonParser, async (req,res,next)=>{
    if(Object.keys(req.body).length === 0){
        var deleted = await removeAllSmokeDays();
        res.send(deleted);
    } else {
        var deleted = await  removeSmokeDay(req.body.id);
        res.send(deleted);
    }
});

async function removeAllSmokeDays(){
    return new Promise((resolve,reject)=>{
        connection.query("DELETE from SmokeDay",(err,result)=>{
            if(err){
                return reject(err.message);
            } else {
                return resolve("All smoke days removed");
            }
        })
    })
}
async function removeSmokeDay(id){
    var dataSet = {
        smokeID : id
    }
    return new Promise((resolve,reject)=>{
        connection.query("DELETE from Entries where ?",dataSet,(err,result)=>{
            if (err){
                return reject(err.message);
            } else {
                return resolve("Smoke day "+id+" removed");
            }
        })
    })
}
module.exports = wedzarniaManager;