var mongoose = require("../db/db");
var IssuerequestSchema = new mongoose.Schema(
        {
                bookid: {
                        type: String,
                        required: true
                },
                memberid:{
                        type:String,
                        required:true
                },
                requestdatetime:{
                    type:String,
                    required:true
                },
                requested_days:{
                        type:String,
                        required:true
                }
        });

var Issuerequest = mongoose.model("issuerequest", IssuerequestSchema);

module.exports = Issuerequest;