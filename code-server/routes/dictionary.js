var express = require('express');
var router = express.Router();

router.get('/contents', function(req, res) {
    res.render('dictionary/dic_contents');
});

router.get('/', function(req, res) {
    res.render('dictionary/dic_front');
});

router.get('/write', function(req, res) {
    res.render('dictionary/dic_search');
});

module.exports = router;
