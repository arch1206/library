var mongoose = require("../db/db");
var BookSchema = new mongoose.Schema(
        {
                author:{
                        type:String,
                        required:true
                },
                isbn:{
                        type:String,
                        required:true
                },
                title:{
                        type:String,
                        required:true
                },
                books:[
                        {
                                '_id':{type:mongoose.Schema.Types.ObjectId,auto:true },
                                'status':{type:Number},
                                'type':{type:Number},
                                "issue_read_id":{type:String}
                        }
                ]
        });

var Book = mongoose.model("book", BookSchema);

module.exports = Book;
