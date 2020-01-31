module.exports = {
  generatePostMinObject: function(postObject) {
    return {
      id: postObject._id.toString(),
      title: postObject.title,
      content:  postObject.content 
    }
  },
  generatePostObject: function(postObject) { 
    author =  {
      type: 'post',
      id: postObject._id.toString(),
      attributes: {
        'title': postObject.title,
        'lastName': postObject.content
      },
      "relationships": {
        "author": {
          "data": generateAuthorMinObject(postObject.author)
        }
      }
    }
    return author
  }
}