var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('tutorial/tuto_front');
});

router.get('/contents', function(req, res) {
    res.render('tutorial/tuto_contents');
});

router.get('/my', function(req, res) {
    res.render('tutorial/tuto_my');
});

module.exports = router;
