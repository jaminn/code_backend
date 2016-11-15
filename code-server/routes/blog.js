var express = require('express');
var router = express.Router();

router.get('/afterseries', function(req, res) {
    res.render('blog/blog_AfterSeriesClicked');
});

router.get('/', function(req, res) {
    res.render('blog/blog_front');
});

router.get('/posting', function(req, res) {
    res.render('blog/blog_posting');
});

router.get('/artical', function(req, res) {
    res.render('blog/blog_series_artical');
});

router.get('/series', function(req, res) {
    res.render('blog/blog_seriesClicked');
});

router.get('/upload', function(req, res) {
    res.render('blog/blog_Upload');
});

router.get('/profile', function(req, res) {
    res.render('blog/blog_profile');
});


module.exports = router;
