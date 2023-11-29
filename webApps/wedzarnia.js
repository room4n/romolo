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
    var status;
    var lastEntry = await getLastSmokeDay();
    var lastSmokeID = lastEntry.id;
    var lastSmokeDate = new Date(JSON.parse(JSON.stringify(lastEntry.date))).toLocaleDateString('pl-PL',formatOptions).split(', ')[0];
    var currentDate = new Date().toLocaleDateString('pl-PL',formatOptions).split(', ')[0];
    var currentTime = new Date().toLocaleDateString('pl-PL',formatOptions).split(', ')[1];
    var tempBottom = req.body.tempBottom;
    var tempTop = req.body.tempTop;
    var prod1Temp = req.body.prod1Temp;
    var prod2Temp = req.body.prod2Temp;

    if(lastSmokeDate == currentDate){
        //insert into entries table new entry with last smokedayid
    } else {
        //create new smokeday entry
        //inser into entries with new smokeday entry

        //draft
        //insertEntry(smokeID, currentTime ,req.body.tempBottom, req.body.tempTop,req.body.prod1Temp,req.body.prod2Temp);
        //(smokeID, dateTime, tempBottom, tempTop, product1Temp, product2Temp)
        var data = {
            lastSmokeID, 
            currentTime, 
            tempBottom, 
            tempTop, 
            prod1Temp, 
            prod2Temp
        }
        status = await insertEntry(data);
    }

    res.status(200).json({
        lastID: lastSmokeID,
        lastDate: lastSmokeDate,
        currentDate: currentDate,
        currentTime: currentTime,
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
        connection.query("INSERT INTO Entries (smokeID, dateTime, tempBottom, tempTop, product1Temp, product2Temp) VALUES (? ? ? ? ? ?)",dataSet,(err,result)=>{
            if (err){
                return reject(err.message);
            } else {
                return resolve("done");
            }
        })
    })
}

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