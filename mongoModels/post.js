var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  content: String,
});

module.exports = mongoose.model('Post', PostSchema);