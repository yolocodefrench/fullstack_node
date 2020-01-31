var mongoose = require('mongoose');
const postModel = require('./post')
var Schema = mongoose.Schema;


var AuthorSchema = new Schema({
  firstName:  String, // String is shorthand for {type: String}
  lastName: String,
  posts: [
    {type: Schema.Types.ObjectId, ref: 'Post'}
  ]
});

authorModel = mongoose.model('Author', AuthorSchema);

authorModel.getPosts = async (author)=>{
  return await postModel.find({ _id: { $in: author.posts }})
}
module.exports = authorModel