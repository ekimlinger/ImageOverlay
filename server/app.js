var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary');
var access = require('../access-tokens.json');
var image = require('../models/images.js');


cloudinary.config({
  cloud_name: access['cloud_name'],
  api_key:  access['api_key'],
  api_secret: access['api_secret']
});

console.log(access.cloud_name, " ", access.api_key," ", access.api_secret);

app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({
    limit: '30mb',
    extended: true
}));



// Testing

var image = path.join(__dirname,'EvanTransparent.png');

cloudinary.uploader.upload(image, function(result) {

  console.log(result);
});

cloudinary.api.resource('sample',
  function(result)  { console.log(result) });



/************************************/



app.post('/upload-image', function(req,res){
  var image = req.body.image;

  cloudinary.uploader.upload(image, function(result) {
    // Test to see if the image upload succeeded,
    // if not throw error

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
    // Format image that was stored
    cloudinary.image(result.public_id, { width: 600 });

    // Send image url back to database
    res.send(result.secure_url);
  });

  res.status(200).send("Posted image successfully");
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
