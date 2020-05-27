var jwt = require('jsonwebtoken');
var member = require('./model/adminmodel');
var admin = require('./model/membermodel')
var token = require('./model/tokenmodel')
function verifyToken2(req, res, next) {
  
    if (req.headers.authorization) {
      var token = req.headers.authorization.split('Bearer ')[1];
      console.log(token)
      jwt.verify(token, "StackFinance_Archit", (err, doc) => {
        if (err) {
          console.log(err)
          res.json({ "msg": "Invalid Token" }).status(401);
        }
        else {
          if (doc.type == 2)
          {
            next()
          }
           
          else
            res.json({ "msg": "Invalid Token" }).status(401);
        }
      });
    }
    else {
      console.log("header not found");
      res.json({ "msg": "Authorization header not found." }).status(401);
    }
  }
  module.exports= verifyToken2