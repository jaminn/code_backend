var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if(req.session.nickname){
      res.render('blog/blog_front', {nickname: req.session.nickname});
    }else{
      res.render('blog/blog_front', {nickname: null});
    }
});

router.get('/posting', function(req, res) {
    res.render('blog/blog_posting');
});

router.get('/search', function(req, res) {
    res.render('blog/blog_search');
});

router.post('/search', function(req, res) {
    res.render('blog/blog_search');
});


module.exports = router;
