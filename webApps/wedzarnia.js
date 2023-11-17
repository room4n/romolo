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
})

module.exports = wedzarniaRoutes;