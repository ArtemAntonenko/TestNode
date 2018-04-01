let express = require('express')
let router = express.Router()
let Article = require('../models/article');

router.route('/get-all-articles')
  .get((req, res) => {
    Article.find((err, articles) => {
      if (err)
        res.send(err);

      res.json(articles);
    });
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
