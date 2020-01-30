mongoose = require('mongoose');


module.exports = (app, db) => {
    app.post('/author', async (req, res) => {
      let author = new db.Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      })
      await author.save().then((result) => 
        res.json(result)
      ).catch(error => res.json(error))
    })
  
    app.get('/authors', async (req, res) => {
      await db.Author.find({}
      ).then((result) => {
        return res.json(result)
      })
    })
  }
  