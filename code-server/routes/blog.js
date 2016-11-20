var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('blog/blog_front', {
        nickname: req.session.nickname
    });
});

router.get('/posting', function (req, res) {
    res.render('blog/blog_posting', {
        nickname: req.session.nickname
    });
});

router.get('/search', function (req, res) {
    res.render('blog/blog_search', {
        nickname: req.session.nickname
    });
});

router.post('/search', function (req, res) {
    var data = req.body.data;
    res.render('blog/blog_search', {
        nickname: req.session.nickname,
        data: data
    });
});

router.get('/edit', function (req, res) {
    res.render('blog/blog_edit', {
        nickname: req.session.nickname
    });
});

router.post('/edit', function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var series = req.body.series;
    var token = rndString.generate();
    var date = moment().tz("Asia/Seoul").format("YYYY.MM.DD");

    var board = new Boards({
        writer: req.session.nickname,
        title: title,
        contents: content,
        token: token,
        date: date,
        series: series
    });

    board.save(function (err, result) {
        if (err) res.redirect('/blog');
        if (result) res.redirect('/blog');
    });


});


module.exports = router;
