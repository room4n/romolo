const express = require('express');
const wedzarniaRoutes = express.Router();
const connection = require("../config/database");

wedzarniaRoutes.get('/', (req,res,next)=>{
    connection.query("select * from Products",(err,result)=>{
        if(err){
            res.send(err.message)
        } else {
            res.send(result)
        }
    })
});
wedzarniaRoutes.post('/addEntry',(req,res,next)=>{
    res.status(200).json({
        message: 'wedzarnia entry post handled'
    });
})

module.exports = wedzarniaRoutes;