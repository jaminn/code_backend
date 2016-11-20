var express = require('express');
var router = express.Router();
var rndString = require('randomstring');
var moment = require('moment-timezone');

router.get('/profile', function (req, res) {
    res.render('my/my_profile', {
        nickname: req.session.nickname
    });
});


router.get('/post', function (req, res) {
    res.render('my/my_post', {
        nickname: req.session.nickname
    });
});

router.get('/series', function (req, res) {
    res.render('my/my_series', {
        nickname: req.session.nickname
    });
});


router.post('/series', function (req, res) {
    var title = req.body.title;
    var token = rndString.generate();
    var series = new Serieses({
        title: title,
        token: token,
        writer: req.session.nickname
    });

    series.save(function (err, result) {
        if (err) res.redirect('/my/series');
        if (result) res.redirect('/my/series');
    });
});



router.get('/seriesclicked', function (req, res) {
    res.render('my/my_seriesClicked', {
        nickname: req.session.nickname
    });
});


router.get('/tutorial', function (req, res) {
    res.render('my/my_tutorial', {
        nickname: req.session.nickname
    });
});

module.exports = router;
