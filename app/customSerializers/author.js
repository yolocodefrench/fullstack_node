module.exports = {
  generateAuthorMinObject: function (authorObject) {
    return {
      id: author._id.toString(), 
      lastName: author.lastName,
      firstName: author.firstName
    }
  },
  generateAuthorObject: function (authorObject) { 
    author =  {
      type: 'author',
      id: authorObject._id.toString(),
      attributes: {
        'firstName': authorObject.firstName,
        'lastName': authorObject.lastName
      },
      "relationships": {
        "posts": {
          "data": [
          ]
        }
      }
    }
    return author
  }
}