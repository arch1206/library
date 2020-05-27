var mongoose = require("../db/db");
var issuedSchema = new mongoose.Schema(
        {
            bookid: {
                type: String,
                required: true
            },
            bookid2:{
                type:String,
                required:true
            },
            issuedate:{
                type:String,
                required:true
            },
            requesteddate:{
                type:String,
                required:true
            },
            userid:{
                type:String,
                required:true
            }
        });

var issued = mongoose.model("issued", issuedSchema);

module.exports = issued;