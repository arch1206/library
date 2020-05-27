var mongoose = require("../db/db");
var HistorySchema = new mongoose.Schema(
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

var history = mongoose.model("history", HistorySchema);

module.exports = history;