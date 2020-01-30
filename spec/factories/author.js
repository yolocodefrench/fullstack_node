const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.MongooseAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const Author = require('../../mongoModels').Author

factory.define('author', Author, {
  firstName: factory.sequence((n) => `firstName${n}`),
  lastName: factory.sequence((n) => `lastName${n}`),
})