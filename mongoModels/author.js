var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  firstName:  String, // String is shorthand for {type: String}
  lastName: String,
  posts: [
    {type: Schema.Types.ObjectId, ref: 'Post'}
  ]
});

module.exports = mongoose.model('Author', AuthorSchema);