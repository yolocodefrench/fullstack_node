const request = require('supertest')
const app = require('../app')
const db = require('../mongoModels');
const cleanDb = require('./helpers/cleanDb')

require('./factories/author').factory
require('./factories/post').factory
const factory = require('factory-girl').factory

beforeAll(async () => {
  await cleanDb(db)
});

afterAll(async () => {
  await cleanDb(db)
  await db.close()
});

describe('GET /', () => {
  let response;

  beforeAll(async () => {
    await cleanDb(db)
    response = await request(app).get('/');
  })

  test('It should respond with a 200 status code', async () => {
    expect(response.statusCode).toBe(200);
  });
});

describe('POST /author', () => {

  let response;
  let data = {};
  beforeAll(async () => {
    data.firstName = 'Seb'
    data.lastName = 'Ceb'
    response = await request(app).post('/author').send(data).set('Accept', 'application/json');
  })

  test('It should respond with a 200 status code', async () => {
    expect(response.statusCode).toBe(200);
  });

  test('It should return a json with the new author', async () => {
    expect(response.body.data[0].attributes.firstName).toBe(data.firstName);
    expect(response.body.data[0].attributes.lastName).toBe(data.lastName);
  });
  test('It should create and retrieve a post for the selected author', async () => {
    const author = await db.Author.findOne({_id: response.body.data[0].id
    })
    expect(author._id.toString()).toBe(response.body.data[0].id)
    expect(author.firstName).toBe(data.firstName)
    expect(author.lastName).toBe(data.lastName)
  });

});

describe('GET /authors', () => {

  let response
  let authors

  beforeAll(async () => await cleanDb(db))

  describe('when there is no author in database', () => {
    beforeAll(async () => {
      response = await request(app).get('/authors').set('Accept', 'application/json');
    })

    test('It should not retrieve any author in db', async () => {
      const authors = await db.Author.find({})
      expect(authors.length).toBe(0);
    });
    test('It should respond with a 200 status code', async () => {
      expect(response.statusCode).toBe(200);
    });
    test('It should return a json with a void array', async () => {
      expect(response.body).toStrictEqual({data: [], included: []});
    });
  })


  describe('when there is one or more authors in database', () => {
    beforeAll(async () => {
      authors = await factory.createMany('author', 2)
      response = await request(app).get('/authors').set('Accept', 'application/json')
    })

    test('It should not retrieve any author in db', async () => {
      const authorsInDatabase = await db.Author.find({})
      expect(authorsInDatabase.length).toBe(2)
    });
    test('It should respond with a 200 status code', async () => {
      expect(response.statusCode).toBe(200)
    });
    test('It should return a json with a void array', async () => {

      expect(response.body.data.length).toBe(2)
      const expectedBody = {
        data: [
          {
            type: 'author',
            id: authors[0]._id.toString(),
            attributes: {
              'firstName': authors[0].firstName,
              'lastName': authors[0].lastName
            },
            "relationships": {
              "posts": {
                "data": [
                ]
              }
            }
          },
          {
            type: 'author',
            id: authors[1]._id.toString(),
            attributes: {
              'firstName': authors[1].firstName,
              'lastName': authors[1].lastName
            },
            "relationships": {
              "posts": {
                "data": [
                ]
              }
            }
          }
        ],
        "included": []
      }

      expect(response.body).toEqual(expectedBody)
    });
  })
});

describe('POST /post', () => {

  let response
  let data = {}
  let post
  let author

  beforeAll(async () => await cleanDb(db))

  describe('The author has one or multiple posts', () => {
    beforeAll(async () => {
      author = await factory.create('author')
      post = await factory.build('post')
      data.title = post.title
      data.content = post.content
      data.AuthorId = author.id
      response = await request(app).post('/post').send(data).set('Accept', 'application/json')
    })

    test('It should respond with a 200 status code', async () => {
      expect(response.statusCode).toBe(200);
    });

    test('It should create and retrieve a post for the selected author', async () => {
      const postsInDatabase = await db.Post.find({})
      expect(postsInDatabase.length).toBe(1)
      expect(postsInDatabase[0].title).toBe(post.title)
      expect(postsInDatabase[0].content).toBe(post.content)
    });
    
    test('It should return a json with the author\'s posts', async () => {
      expect(response.body.title).toBe(data.title);
      expect(response.body.content).toBe(data.content);
    });

    test('The post should belong to the selected authors\' posts', async () => {
      author = await db.Author.findById(author._id)
      posts = await author.getPosts()
      expect(posts.length).toBe(1)
      expect(posts[0].title).toBe(post.title)
      expect(posts[0].content).toBe(post.content)
    })
  })
});
