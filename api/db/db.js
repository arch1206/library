var mongoose = require("mongoose");
var uri = 'mongourl'
mongoose.connect(uri,{ useNewUrlParser: true ,useFindAndModify:true,useUnifiedTopology: true  ,useCreateIndex: true,useFindAndModify: false});
//mongoose.set('debug', true);
module.exports=mongoose;
