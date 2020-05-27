var mongoose = require("../db/db");
var AdminSchema = new mongoose.Schema(
        {
                name: {
                        type: String,
                        required: true
                },
                username:{
                        type:String,
                        required:true,
                        unique:true
                },
                password:{
                        type:String,
                        required:true
                }
        });

var Admin = mongoose.model("admin", AdminSchema);

module.exports = Admin;