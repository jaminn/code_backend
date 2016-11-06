var express = require('express');
var router = express.Router();

router.get('/contents', function(req, res) {
    res.render('qna/qna_contents');
});

router.get('/', function(req, res) {
    res.render('qna/qna_Front');
});

router.get('/write', function(req, res) {
    res.render('qna/qna_write');
});

module.exports = router;
