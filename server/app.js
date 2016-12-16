var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary');
var access = require('../access-tokens.json');

//MONGO
var mongoose = require("mongoose");
var mongoURI =
    process.env.MONGODB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://127.0.0.1:27017/girls-are-powerful';

var MongoDB = mongoose.connect(mongoURI).connection;


MongoDB.on("error", function(err) {
    console.log("Mongo Connection Error: ", err);
});

MongoDB.once("open", function(err) {
    console.log("Mongo Connection Open on: ", mongoURI);
});

var Image = require('./models/images.js');



cloudinary.config({
  cloud_name: access['cloud_name'],
  api_key:  access['api_key'],
  api_secret: access['api_secret']
});

console.log(access.cloud_name, " ", access.api_key," ", access.api_secret);

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));



/************************************/



app.post('/upload-image', function(req,res){
  var image = req.body;
  console.log("Got image: ", image.imageName);
  cloudinary.uploader.upload(
    image.imageBody,
    function(result) {
    // Test to see if the image upload succeeded,
    // if not throw error
    console.log("Got stuff back from server");
    // Save image information to the database
    var storedImage = new Image({
      public_id: result.public_id,
      version: result.version,
      signature: result.signature,
      width: result.width,
      height: result.height,
      format: result.format,
      resource_type: result.resource_type,
      created_at: result.created_at,
      tags: result.tags,
      bytes: result.bytes,
      type: result.type,
      etag: result.etag,
      url: result.url,
      secure_url: result.secure_url,
      original_filename: result.original_filename

    });

    console.log(result);

    res.send(result.secure_url);

  },{transformation: 'bottom_overlay'}
  );





  // Need error handling
  // res.status(200).send("Posted image successfully");

});




app.get("/*", function(req,res){
  var file = req.params[0] || "assets/views/index.html";
  res.sendFile(path.join(__dirname,"/public/", file));
  // Send documentation on how to use API
});

app.set("port",(process.env.PORT || 3000));

app.listen(app.get("port"),function(){
  console.log("Listening on port: ", app.get("port"));
});

module.exports = app;
