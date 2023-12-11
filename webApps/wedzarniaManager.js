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
    res.status(200).json({
        days: days
    });
})

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