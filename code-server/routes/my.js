var express = require('express');
var router = express.Router();


router.get('/profile', function(req, res) {
    res.render('my/my_profile');
});


router.get('/post', function(req, res) {
    res.render('my/my_post');
});


router.get('/series', function(req, res) {
    res.render('my/my_series');
});

router.get('/seriesclicked', function(req, res) {
    res.render('my/my_seriesClicked');
});


router.get('/tutorial', function(req, res) {
    res.render('my/my_tutorial');
});

module.exports = router;
