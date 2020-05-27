var route = require("express").Router();
const mongoose = require('mongoose');
var issuerequest = require('../model/issuerequestmodel');
var member = require("../model/membermodel");
var book = require("../model/bookmodel")
var member = require("../model/membermodel")
var Promise = require('promise')
var issued = require('../model/issuedmodel');
var verifyToken  = require("../jwt")
var verifyToken2 = require("../jwt2")
// var userhistory = require('../model/historymodel')


route.post("/issuerequest1/:id", verifyToken,async (req, res) => {
     let date_ob = new Date();
     if (date_ob.getHours() <= 24) {
          member.findOne({ "_id": req.body.uuid }, (err, doc) => {
               if (doc) {
                    var date2 = new Date(doc.membershipexpire);
                    var Difference_In_Time = date2.getTime() - date_ob.getTime();
                    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                    console.log(doc,Difference_In_Days)
                    if(req.body.data[3]==7 && doc.membershipdays<=5)
                    {
                         res.json({"msg":"Membership is ending in 5 days, cannot issue"})
                    }
                    else{
                         data = {}
                         data['bookid'] = req.body.data[3]
                         data['memberid' ]=req.body.uuid
                         data['requestdatetime']=date_ob
                         data['requested_days'] = req.params.id
                         issuerequest.create(data,(err,doc)=>{

                              if(doc){
                                   res.json({status: "success"})
                              }else{
                                   // console.log(err)
                                   // console.log("false");
                                   res.json({status:false})
                              }
                         })
                    }
               }
               
               //      
               else { res.json({ status: false }) }
          })

     }
     else {
          res.json({ "msg": "No request after 3PM;" })
     }


})
route.get("/rejectrequest/:id",verifyToken2, async (req, res) => {
     issuerequest.deleteOne({ _id: req.params.id }, (err, doc) => {
          if (doc)
               res.json({ "status": "success" })
          else {
               res.json({ "status": "fail" })
          }
     })
})
route.post("/acceptrequest",verifyToken2, async (req, res) => {
     // console.log(req.body[)
     let date_ob = new Date();
     book.findOne({ _id: req.body[4] }, (err, doc) => {
          var bookid = req.body[4]
          var bookid2 = null
          if (doc) {
               var flag = 0
               // console.log(doc)
               doc.books.forEach(e => {
                    if (e.type == 2 && e.status == 0) {
                         flag = 1
                         bookid2 = e._id;
                         return;
                    }
               })
               if (flag == 0)
                    res.json({ "msg": "all books are issued" })
               else {
                    issuedata = {}
                    issuedata['bookid'] = bookid
                    issuedata['bookid2'] = bookid2
                    issuedata['issuedate'] = date_ob
                    issuedata['requesteddate'] = req.body[2]
                    issuedata['userid'] = req.body[5]
                    issued.create(issuedata, (err, doc1) => {
                         if (doc1) {
                              issuerequest.deleteOne({ _id: req.body[6] }, (err2, doc) => {
                                   book.findOneAndUpdate({ _id: bookid, "books._id": bookid2 }, { $set: { "books.$.status": '1', "books.$.issue_read_id": req.body[6] } }, (err, doc4) => {
                                        res.json({ "status": "success" })
                                   })

                              })
                         }
                         else {
                              res.json({ "status": "fail" })
                         }
                    })
               }

          }
          else {
               res.json({ "status": "fail" })
          }
     })
     // issued.create({})
})

route.get("/issuerequstdata", verifyToken2,async (req, res) => {
     var issudetails = await issuerequest.find({})
     formatIssueDetails(issudetails).then(data => res.json({ "data": data }));
})

function formatIssueDetails(issudetails) {
     return new Promise((resolve, reject) => {
          if (issudetails.length > 0) {
               var data = []
               issudetails.forEach(async e => {

                    var memberdetail = await member.findOne({ _id: e.memberid })
                    var bookdetail = await book.findOne({ _id: e.bookid })
                    data.push([bookdetail.title, memberdetail.name, e.requestdatetime, e.requested_days, e.bookid, e.memberid, e._id])
                    if (issudetails.length == data.length) {
                         resolve(data)
                    }
               })
               // resolve(data)
          }
     })
}

module.exports = route;