let express = require('express')
let router = express.Router()
let Article = require('../models/article');

router.route('/get-all-articles')
  .get((req, res) => {
  console.log('req query', req.query.search)
    const settings = req.query.search ?
      { title: { $regex: new RegExp(req.query.search, 'i') } } :
      {}

    Article.find(settings, (err, articles) => {
      if (err)
        res.send(err)

      res.json(articles)
    })
  })

router.route('/create-article')
  .post((req, res) => {
  console.log('res body', req.body)
    let article = new Article({
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
      publishDate: req.body.publishDate
  })

    article.save((err) => {
      if (err)
        res.send(err)
      res.json({ message: 'article created!' })
    })
  })

router.route('/update-article/:article_id')
  .put((req, res) => {
    Article.findById(req.params.article_id, function(err, article) {

      if (err)
        res.send(err);

      article.title = req.body.title
      article.body = req.body.body

      article.save(function(err) {
        if (err)
          res.send(err)

        res.json({ message: 'Article updated!' })
      })
    })
  })

router.route('/get-by-name/:article_name')
  .get((req, res) => {
    Article.find({ title: { $regex: new RegExp(req.params.article_name, 'i') } }, function(err, articles) {
      if (err)
        res.send(err)
      res.json(articles)
    })
  })

router.route('/delete-article/:article_id')
  .delete((req, res) => {
    Article.remove({
      _id: req.params.article_id
    }, (err, article) => {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  })

module.exports = router
