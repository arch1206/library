var route = require("express").Router();
var mongoose = require('mongoose');
var book = require('../model/bookmodel');
var bcrypt = require("bcrypt");
var issued = require('../model/issuedmodel');
var jwt = require('jsonwebtoken');
var member = require('../model/membermodel');
var userhistory = require('../model/userhistorymodel');
var history = require('../model/historymodel')
var verifyToken  = require("../jwt")
var verifyToken2 = require("../jwt2")


route.get("/issuedbooks",verifyToken2,async(req,res)=>{
    var issueddata = await issued.find({})
        formatIssueDetails(issueddata).then(data => res.json({"data":data}));
})
function formatIssueDetails(issudetails){
    return new Promise((resolve, reject) => {
         if(issudetails.length>0)
         {
         var data = [] 
         issudetails.forEach(async e => {

                   var memberdetail = await member.findOne({_id:e.userid})
                   var bookdetail = await  book.findOne({_id:e.bookid})
                   data.push([bookdetail.title,e.issuedate,memberdetail.name,e.bookid,e.userid,e._id])
                   if(issudetails.length == data.length){
                    //    console.log(data)
                        resolve(data)
                   }
              })
              // resolve(data)
         }
    })
}

route.get("/issuedbookuser/:id",verifyToken,async(req,res)=>{
    var issueddata = await issued.find({userid:req.params.id})
    formatIssueddata(issueddata).then(data => res.json({"data":data}));
})

function formatIssueddata(issudetails){
    return new Promise((resolve, reject) => {
         if(issudetails.length>0)
         {
         var data = [] 
         issudetails.forEach(async e => {
                   var bookdetail = await  book.findOne({_id:e.bookid})
                   data.push([bookdetail.title,e.issuedate,e.bookid,e.userid,e._id])
                   if(issudetails.length == data.length){
                    //    console.log(data)
                        resolve(data)
                   }
              })
              // resolve(data)
         }
    })
}
route.get("/returnbook/:id",verifyToken,async(req,res)=>{
    let date_ob = new Date();
    issued.findById({_id:req.params.id},(err,doc)=>{
        if(doc){
            book.findOneAndUpdate({_id:doc.bookid,"books._id":doc.bookid2},{$set:{"books.$.status":'0',"books.$.issue_read_id":null}},async (err,doc1)=>{
                var userhistory1 = await userhistory.create({"bookid":doc.bookid,"issuedate":doc.issuedate,
                                        "returndate":date_ob,"userid":doc.userid})
                var history1 = await history.create({"bookid":doc.bookid,"issuedate":doc.issuedate,
                                        "returndate":date_ob,"userid":doc.userid})
                issued.deleteOne({_id:req.params.id},(err,doc3)=>{
                    res.json({"status":"success"})
                })
 
           })
        }
        else
        {
            res.json({status:"fail"})
        }
    })
})
module.exports = route;