var route = require("express").Router();
const mongoose = require('mongoose');
var history = require('../model/historymodel');
var userhistory = require("../model/userhistorymodel")
var book = require("../model/bookmodel")
var member = require('../model/membermodel')
var verifyToken  = require("../jwt")
var verifyToken2 = require("../jwt2")


route.get("/userhistory/:id",verifyToken, async (req, res) => {
    var userhistorydata = await userhistory.find({userid:req.params.id})
//     console.log(userhistorydata)
    formathistorydata(userhistorydata).then(data => res.json({"data":data}));
})
route.get("/history",verifyToken2, async (req, res) => {
     var historydata = await history.find({})
 //     console.log(userhistorydata)
     formatadminhistorydata(historydata).then(data => res.json({"data":data}));
 })
route.get("/deletehistory/:id", verifyToken,async (req, res) => {
     userhistory.deleteOne({_id:req.params.id},(err,doc)=>{
          if(doc)
               res.json({"status":"success"})
          else
               res.json({"status":"fail"})
     })
 })
function formathistorydata(issudetails){
     return new Promise((resolve, reject) => {
          if(issudetails.length>0)
          {
          var data = [] 
          issudetails.forEach(async e => {
                    var bookdetail = await  book.findOne({_id:e.bookid})
                    data.push([bookdetail.title,e.issuedate,e.returndate,e.userid,e._id])
                    if(issudetails.length == data.length){
                     //    console.log(data)
                         resolve(data)
                    }
               })
               // resolve(data)
          }
          else
          resolve([])

     })
 }
 function formatadminhistorydata(issudetails){
     return new Promise((resolve, reject) => {
          if(issudetails.length>0)
          {
          var data = [] 
          issudetails.forEach(async e => {
                    var bookdetail = await  book.findOne({_id:e.bookid})
                    var memberdetail = await  member.findOne({_id:e.userid})
                    data.push([bookdetail.title,e.issuedate,memberdetail.name,e.returndate,e.userid,e._id])
                    if(issudetails.length == data.length){
                         resolve(data)
                    }
               })
               // resolve(data)
          }
          else
          resolve([])

     })
 }
 module.exports = route;