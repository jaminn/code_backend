var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        nickname: req.session.nickname
    });
});
router.get('/search', function (req, res) {
    res.render('search', {
        nickname: req.session.nickname
    });
});
router.post('/search', function (req, res) {
    var data = req.body.data;
    res.render('search', {
        nickname: req.session.nickname,
        data: data
    });
});

router.get('/pad2', function (req, res) {
    res.render('pad2', {
        nickname: req.session.nickname
    });
});

module.exports = router;
