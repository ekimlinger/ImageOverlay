var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./modules/index.js');
var cloudinary = require('cloudinary');
var access = require('../access-tokens.json');

cloudinary.config({
  cloud_name: access["cloud_name"],
  api_key: ["api_key"],
  api_secret: ["api_secret"]
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.post('/upload-image', function(req,res){
  var image = req.body.
  res.status(200).send("Posted image successfully")
});


app.get('/test',function(req,res){
  var file = req.params[0] || "/views/index.html";
  res.sendFile(path.join(__dirname,"/public/", file));
});

app.get("/*", function(req,res){
  var file = req.params[0] || "/views/index.html";
  res.sendFile(path.join(__dirname,"/public/", file));
  // Send documentation on how to use API
});

app.set("port",(process.env.PORT || 3000));

app.listen(app.get("port"),function(){
  console.log("Listening on port: ", app.get("port"));
});

module.exports = app;
