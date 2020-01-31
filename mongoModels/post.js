var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  content: String,
  author: 
    {type: Schema.Types.ObjectId, ref: 'Author'}
});

module.exports = mongoose.model('Post', PostSchema);