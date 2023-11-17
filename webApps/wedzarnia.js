const express = require('express');
const wedzarniaRoutes = express.Router();
const connection = require("../config/database");

router.get('/', (req,res,next)=>{
    con.query("select * from Products",(err,result)=>{
        if(err){
            res.send(err.message)
        } else {
            res.send(result)
        }
    })
})

module.exports = wedzarniaRoutes;