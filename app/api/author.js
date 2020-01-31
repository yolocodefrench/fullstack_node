mongoose = require('mongoose');
authorSerializer = require('../customSerializers/author')
postSerializer = require('../customSerializers/post')

module.exports = (app, db) => {
    app.post('/author', async (req, res) => {
      let author = new db.Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      })
      await author.save().then((result) => {
        json = {
          data: [authorSerializer.generateAuthorObject(result)]
        } 
        return res.json(json)
      }
      ).catch(error => res.json(error))
    })
  
    app.get('/authors', async (req, res) => {
      await db.Author.find({}
      ).then((result) => {
        authorsList = result.map( e => authorSerializer.generateAuthorObject(e))
        json = {
          data: authorsList
        }
        return res.json(json)
      })
    })
  }
  