let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  title: String,
  body: String,
  author: String,
  publishDate: String
});

module.exports = mongoose.model('Article', ArticleSchema);
