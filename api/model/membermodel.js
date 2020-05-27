var mongoose = require("../db/db");
var MemberSchema = new mongoose.Schema(
        {
                name: {
                        type: String,
                        required: true
                },

                username: {
                        type: String,
                        required: true,
                        unique : true
                },
                membershipdays:{
                        type:Number,
                        required:true
                },
                membershiphours:{
                        type:Number,
                        required:true
                },
                password:{
                        type:String,
                        required:true
                },
                membershipexpire:{
                        type:String,
                        required:true
                }
        });

var Member = mongoose.model("member", MemberSchema);

module.exports = Member;
