var mongoose = require("../db/db");
var TokenSchema = new mongoose.Schema(
        {
                token: {
                        type: String,
                        required: true,
                },
                uuid:{
                        type:String,
                        required:true,
                        unique:true
                },
                type:{
                        type:String,
                        required:true
                }
        });

var Token = mongoose.model("token", TokenSchema);

module.exports = Token;