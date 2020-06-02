var route = require("express").Router();
var mongoose = require('mongoose');
var admin = require('../model/adminmodel');
var bcrypt = require("bcrypt");
var token = require('../model/tokenmodel');
var jwt = require('jsonwebtoken');



route.get("/admin", async (req, res) => {
    var resp = await admin.find({})
     if(resp){
          res.json({status: true})
     }else{
          // console.log("false");
          res.json({status:false})
     }
})
route.post("/loginadmin", async (req, res) => {
     responce= {}
     admin.findOne({username:req.body.username},(err,doc)=>{
          if(doc){
               bcrypt.compare(req.body.password, doc.password).then(function (pass,err1) {
                    if(pass){
                         jwt.sign({ "uuid": doc._id, "type": "2" }, "StackFinance_Archit", { expiresIn: '8h' }, (err3, token2) => {
                              token.findOneAndUpdate({"uuid":doc._id,"type":"2"},{"token":token2},{ new: true,upsert: true },(err2,doc1)=>{
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
// route.get("/addadmin",async(req,res)=>{
//      bcrypt.hash("Archit123", 10, function (err, hash) {
//           indata= {}
//           indata['username'] = "admin"
//           indata['name']="admin"
//           indata['password'] = hash
//           console.log(indata)
//           admin.create( indata, function (err, doc) {
//                if (!err && doc) {
//                    res.json({ "_id": doc.id });
//                }
//                else(
//                     consol.log(err)
//                )
//            });
//       });

// })
module.exports = route;