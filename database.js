var db = {};
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/blog');

var PostSchema = new Schema({
    img : String,
    title: String,
    tags : [String],
    author : String,
    date : String,
    text : String,
    coments_count : Number
});


db.Post = mongoose.model('posts', PostSchema);
module.exports = db;