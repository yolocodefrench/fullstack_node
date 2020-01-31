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

AuthorSchema.methods.getPosts =async function() {
  return await this.model('Post').find({ _id: { $in: this.posts }});
};

authorModel = mongoose.model('Author', AuthorSchema);

// Deprecated
authorModel.getPosts = async (author)=>{
  return await postModel.find({ _id: { $in: author.posts }})
}
module.exports = authorModel