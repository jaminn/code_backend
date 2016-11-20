var express = require('express');
var router = express.Router();
var rndString = require('randomstring');
var moment = require('moment-timezone');


router.get('/', function (req, res) {
    res.render('dictionary/dic_front', {
        nickname: req.session.nickname
    });
});

router.get('/contents', function (req, res) {
    Dics.findOne({
        token: req.query.token
    }, function (err, content) {
        if (err) res.redirect('/');
        if (content) {
            res.render('dictionary/dic_contents', {
                content: content,
                nickname: req.session.nickname
            });

        } else {
            res.send("error");
        }
    });
});

router.get('/search', function (req, res) {
    res.render('dictionary/dic_search', {
        nickname: req.session.nickname
    });
});

router.post('/search', function (req, res) {
    var data = req.body.data;
    console.log(req.body);
    Dics.find({
            "title": {
                $regex: ".*" + data + ".*"
            }
        },
        function (err, results) {
            if (err) {
                console.log(err);
            }
            res.render('dictionary/dic_search', {
                nickname: req.session.nickname,
                data: data,
                results: results
            });
        });
});

router.get('/edit', function (req, res) {
    res.render('dictionary/dic_edit', {
        nickname: req.session.nickname
    });
});

router.post('/edit', function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var token = rndString.generate();
    var date = moment().tz("Asia/Seoul").format("YYYY.MM.DD");

    var dic = new Dics({
        writer: req.session.nickname,
        title: title,
        contents: content,
        token: token,
        date: date
    });

    dic.save(function (err, result) {
        if (err) res.redirect('/dictionary');
        if (result) res.redirect('/dictionary');
    });


});

module.exports = router;
