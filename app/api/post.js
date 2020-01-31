authorSerializer = require('../customSerializers/author')
postSerializer = require('../customSerializers/post')

module.exports = (app, db) => {
  app.post('/post', async (req, res) => {

    let author = await db.Author.findById(req.body.AuthorId)

    post = new db.Post({
      title: req.body.title,
      content: req.body.content
    })
    
    author.posts.push(post)
    author.save()
    await post.save().then((result) => 
      res.json(result)
    ).catch(error => res.json(error))
    
    
  })
}