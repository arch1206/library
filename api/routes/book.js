var route = require("express").Router();
const mongoose = require('mongoose');
var book = require('../model/bookmodel');
var verifyToken  = require("../jwt")
var verifyToken2 = require("../jwt2")

route.get("/book",verifyToken2, async (req, res) => {
     var resp = await book.find({}, [], { sort: { name: 1 }, skip: parseInt(req.query.start), limit: parseInt(req.query.length), $group: { "_id": '$_id.isbn' } })
     pdata = []
     if (resp) {
          resp.forEach((doc) => {
               var d = [doc.title, doc.author, doc.isbn, doc["_id"]];
               pdata.push(d);
          });
          res.json({ data: pdata })
     } else {
          res.json({ status: false })
     }
})
route.get("/checkisbn/:id", verifyToken2,async (req, res) => {
     book.countDocuments({ "isbn": req.params.id }, (err, doc) => {
          // console.log(doc)
          if (doc > 0)
               res.json({ "status": "Present" })
          else if (doc == 0)
               res.json({ "status": "NotPresent" })
          else {
               res.json({ "msg": "Server error" })
               // console.log(err)
          }
     })
})
route.post('/updatebook',verifyToken2,async(req,res)=>{
     // console.log(req.body)
     data = []
     data1 = {}
     for (var i = 0; i < req.body.reading; i++) {
          data.push({ type: 1, status: 0,issue_read_id:null })
     }
     for (var i = 0; i < req.body.issue; i++) {
          data.push({ type: 2, status: 0 })
          // data.push({title:req.body.title,author:req.body.author,isbn:req.body.isbn,type:"issue"})
     }
     data1['title'] = req.body.title
     data1['author'] = req.body.author
     data1['isbn'] = req.body.isbn
     // data1['books'] = data
     book.updateOne({_id:req.body._id},{$set:data1,$push:{books:data}}, (err, doc) => {
          if (doc)
               res.json({ "status": "success" })
          else {
               res.json({ "err": "Server Error" })
               // console.log(err)
          }

     })
})
route.post("/addbook",verifyToken2, async (req, res) => {
     data = []
     data1 = {}
     for (var i = 0; i < req.body.reading; i++) {
          data.push({ type: 1, status: 0,issue_read_id:null })
     }
     for (var i = 0; i < req.body.issue; i++) {
          data.push({ type: 2, status: 0 })
          // data.push({title:req.body.title,author:req.body.author,isbn:req.body.isbn,type:"issue"})
     }
     data1['title'] = req.body.title
     data1['author'] = req.body.author
     data1['isbn'] = req.body.isbn
     data1['books'] = data
     // console.log(data)
     book.create(data1, (err, doc) => {
          if (doc)
               res.json({ "status": "sucess" })
          else {
               res.json({ "err": "Server Error" })
               // console.log(err)
          }

     })
     // book.create( indata, function (err, doc) {
     //      if (!err && doc) {
     //           res.json({ "_id": doc.id });
     //      }
     //      else(
     //           consol.log(err)
     //      )
     // })


})
route.get("/books",verifyToken, async (req, res) => {
     // console.log(1)
     var resp = await book.find({}, [], { sort: { name: 1 }, skip: parseInt(req.query.start), limit: parseInt(req.query.length), $group: { "_id": '$_id.isbn' } })
     pdata = []
     if (resp) {
          resp.forEach((doc) => {
               var d = [doc.title, doc.author, doc.isbn, doc["_id"]];
               pdata.push(d);
          });
          res.json({ data: pdata})
     } else {
          res.json({ status: false })
     }
})
route.get("/book/:id", verifyToken2,async (req, res) => {
     book.findOne({ _id: req.params.id }, (err, doc) => {
          res.json({ "data": doc })
     })
})
route.get("/bookforedit/:id",verifyToken2, async (req, res) => {
     var resp = await book.findOne({ _id: req.params.id })
     // var resp = await book.find({},[],{ sort: { name: 1 }, skip: parseInt(req.query.start), limit: parseInt(req.query.length),$group:{"_id":'$_id.isbn'} })
     pdata = []
     if (resp) {
          resp.books.forEach((doc) => {
               var status
               if (doc.status == 0)
                    status = "free"
               else if (doc.status == 1)
                    status = "occupied"

               var type
               if (doc.type == 1)
                    type = "For Reading"
               else
                    type = "For Issue"
               var d = [doc._id, type,status, doc["_id"]];
               pdata.push(d);

          });
          res.json({ recordsTotal: 2, recordsFiltered: 2, data: pdata, "draw": req.query.draw, })
     } else {
          res.json({ status: false })
     }
})
route.post("/bookdelete",verifyToken2, async(req,res)=>{
     book.findOne({_id:req.body.bookid},(err,doc)=>{
          if(doc.books.length==1)
          {
               book.deleteOne({_id:req.body.bookid},(err,doc)=>{
                    if(doc)
                    {
                         res.json({"status":"bookdeleted"})
                    }
                    else
                         {
                         res.json({"status":"fail"})
                         }
               })
          }
          else if(doc.books.length>1)
          {
               book.updateOne({_id:req.body.bookid},{ $pull: { 'books': { _id: req.body.bookid2 } } },(err,doc)=>{
                    if(doc)
                    {
                         res.json({"status":"success"})
                    }
                    else
                         {
                         res.json({"status":"fail"})
                         }
                    })
          }
          else
          {
               {
                    res.json({"status":"fail"})
                    }
          }
     })
     
})
module.exports = route;