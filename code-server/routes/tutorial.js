var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('tutorial/tuto_front', {
        nickname: req.session.nickname
    });
});

router.get('/contents', function (req, res) {
    res.render('tutorial/tuto_contents', {
        nickname: req.session.nickname
    });
});

router.get('/contents_win', function (req, res) {
    res.render('tutorial/tuto_contents_win', {
        nickname: req.session.nickname
    });
});


router.get('/search', function (req, res) {
    res.render('tutorial/tuto_search', {
        nickname: req.session.nickname
    });
});

router.post('/search', function (req, res) {
    var data = req.body.data;
    res.render('tutorial/tuto_search', {
        nickname: req.session.nickname,
        data: data
    });
});

router.get('/edit', function (req, res) {
    res.render('tutorial/tuto_edit', {
        nickname: req.session.nickname
    });
});


router.get('/my', function (req, res) {
    res.render('tutorial/tuto_my', {
        nickname: req.session.nickname
    });
});

module.exports = router;
