var route = require("express").Router();
const mongoose = require('mongoose');
var member = require('../model/membermodel');
var bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
var token = require('../model/tokenmodel')
var verifyToken  = require("../jwt")
var verifyToken2 = require("../jwt2")

route.get("/members",verifyToken2, async (req, res) => {
    var resp = await member.find({})
     if(resp){
          res.json({status: true})
     }else{
          // console.log("false");
          res.json({status:false})
     }
})
route.post("/loginmember", async (req, res) => {
     responce= {}
     member.findOne({username:req.body.username},(err,doc)=>{
          if(doc){
               bcrypt.compare(req.body.password, doc.password).then(function (pass,err1) {
                    if(pass){
                         jwt.sign({ "uuid": doc._id, "type": "1" }, "StackFinance_Archit", { expiresIn: '8h' }, (err3, token2) => {
                              token.findOneAndUpdate({"uuid":doc._id,"type":"1"},{"token":token2},{ new: true,upsert: true },(err2,doc1)=>{
                                   res.json({"token":token2,"uuid":doc._id})
                              })

                         })
                    }
                    else
                    {
                         // console.log(err1)
                         res.json({msg:"Wrong Password"})
                    }
               })
          }
          else
          {
               // console.log(err)
               res.json({msg:"Invalid User"})
          }

     })
})
route.get("/userlist",verifyToken2,async(req,res)=>{
     member.find({},(err,doc)=>{
          if(doc)
          {
               var data = []
               doc.forEach(e=>{
                    data.push([e.name,e.membershipexpire,e._id])
               })
               // var data = [doc.name,doc.membershipexpire,doc._id]
               res.json({"data":data})
          }
          else
          {
               res.json({data:[]})
          }
     })
})
// route.get("/member",async(req,res)=>{
//      bcrypt.hash("Archit123", 10, function (err, hash) {
//           indata= {}
//           indata['username'] = "member"
//           indata['name']="Archit Gupta"
//           indata['password'] = hash
//           indata['membershipdays'] = 25
//           indata['membershiphours'] =15
//           console.log(indata)
//           member.create( indata, function (err, doc) {
//                if (!err && doc) {
//                    res.json({ "_id": doc.id });
//                }
//                else(
//                     consol.log(err)
//                )
//            });
//       });
// })
route.post("/editexpiredate",verifyToken2,async(req,res)=>{
     // console.log(req.body.date2)
     // var d = new Date(req.body.date)
     // console.log(typeof d)
     // console.log(d)

     member.findOneAndUpdate({_id:req.body.id},{"membershipexpire":req.body.date2},(err,doc)=>{
          res.json({status:"success"})
     })
})
route.get("memberdetail/:id",async(req,res)=>{
     member.findOne({_id:req.params.id},(err,doc)=>{
          res.json({"name":doc.name})
     })
})
module.exports = route;