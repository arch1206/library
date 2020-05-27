var mongoose = require("../db/db");
var UserHistorySchema = new mongoose.Schema(
        {   
                bookid: {
                        type: String,
                        required: true
                },
                issuedate:{
                        type:String,
                        required:true
                },
                returndate:{
                        type:String,
                        required:true
                },
                userid:{
                        type:String,
                        required:true
                }
        });

var userhistory = mongoose.model("userhistory", UserHistorySchema);

module.exports = userhistory;