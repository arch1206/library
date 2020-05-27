var express = require('express');
var app = express();
var cors = require('cors');
var app = express();
var http = require("http").createServer(app);
app.use(cors());
var bodyParser = require("body-parser");
app.use(bodyParser.json())
var fs = require("fs")
var router = express.Router();
var path = require('path')
app.use(express.static(__dirname+"/public"));
app.get('/', function (req, res) {
  res.send('Hello World!');
});
fs.readdir('./routes',function(err,f){
	for(k in f){
		app.use("/api",require('./routes/'+f[k]));
	}
});
app.get(/^((?!api).)*$/, async function(req, res) {
		
		res.sendFile(path.join(__dirname , '/public/index.html'));
});
http.listen(3000,()=>{
	console.log("Api Server started.");
})