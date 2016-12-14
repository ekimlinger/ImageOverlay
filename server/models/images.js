var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Images that have been stored in
var Image = new Schema({

    public_id: {type: String, required: true},
    version: {type: String, required: true},
    signature: {type: String, required: true},
    width: {type: String, required: true},
    height: {type: String, required: true},
    format: {type: String, required: true},
    resource_type: {type: String, required: true},
    created_at: {type: String, required: true},
    tags: {type: Array, required: false},
    bytes: {type: Number, required: true},
    type: {type: String, required: true},
    etag: {type: String, required: true},
    url: {type: String, required: true},
    secure_url: {type: String, required: true},
    original_filename: {type: String, required: true}

});

module.exports = mongoose.model("Image", Image)
