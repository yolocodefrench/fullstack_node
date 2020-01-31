mongoose = require('mongoose');
authorSerializer = require('../customSerializers/author')
postSerializer = require('../customSerializers/post')

module.exports = (app, db) => {
    app.post('/author', async (req, res) => {
      let author = new db.Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      })
      await author.save().then(async (result) => {
        const data = await authorSerializer.generateAuthorObject(result)
        json = {
          data: [data]
        } 
        return res.json(json)   
      }
      ).catch(error => res.json(error))
    })
  
    app.get('/authors', async (req, res) => {
      await db.Author.find({}
      ).then(async (result) => {
        const serializedData = await authorSerializer.serializeAuthorObjects(result)
        return res.json(serializedData)
      })
    })
  }
  