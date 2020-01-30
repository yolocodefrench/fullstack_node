const mongoose = require('mongoose');
Author = require('../mongoModels/author');
Post = require('../mongoModels/post');

mongoose.connect('mongodb://192.168.99.100:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
 
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
db.once('open', function (){
 console.log("Connexion à la base OK"); 
});

db.Author = Author
db.Post = Post
module.exports = db;