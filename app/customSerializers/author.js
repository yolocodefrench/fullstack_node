postSerializer = require('./post')

module.exports = {
  /**
   * 
   * @param {Object} authorObject
   */
  generateAuthorMinObject: function (authorObject) {
    return {
      id: author._id.toString(), 
      lastName: author.lastName,
      firstName: author.firstName
    }
  },
  /**
   * 
   * @param {Object} authorObject
   */
  generateAuthorObject: async function (authorObject) { 
    let posts = await authorObject.getPosts()
    let postsMin = [];
    if(posts.length > 0) 
      postsMin = postSerializer.generatePostMinObject(posts)
    author =  {
      type: 'author',
      id: authorObject._id.toString(),
      attributes: {
        'firstName': authorObject.firstName,
        'lastName': authorObject.lastName
      },
      "relationships": {
        "posts": {
          "data": postsMin
        }
      }
    }
    return author
  },
  /**
   * 
   * @param {Array} authorObjectsArray 
   */
  serializeAuthorObjects: async function(authorObjectsArray) {
    let serialized_promises = await authorObjectsArray.map( async e => await authorSerializer.generateAuthorObject(e))
    let serialized_datas = await Promise.all(serialized_promises)
    let posts_promises = await authorObjectsArray.map(async e => {
      let posts = await e.getPosts()
      return posts
    })
    let serialized_included_posts = []
    if(posts_promises.length > 0 ){
      let posts = await Promise.all(posts_promises)
      posts = posts.reduce((old_value, new_value) => old_value.concat(new_value))
      serialized_included_posts = posts.map(e=> postSerializer.generatePostObject(e))
    }
    return {
      data: serialized_datas,
      included: serialized_included_posts
    }
  }
}