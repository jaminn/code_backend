var express = require('express');
var router = express.Router();

router.get('/contents', function(req, res) {
    res.render('dictionary/dic_contents');
});

router.get('/', function(req, res) {
    if(req.session.nickname){
      res.render('dictionary/dic_front', {nickname: req.session.nickname});
    }else{
      res.render('dictionary/dic_front', {nickname: null});
    }
});

router.get('/search', function(req, res) {
    res.render('dictionary/dic_search');
});

router.post('/search', function(req, res) {
    res.render('dictionary/dic_search');
});

module.exports = router;
