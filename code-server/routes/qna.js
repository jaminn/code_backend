var express = require('express');
var router = express.Router();
var rndString = require('randomstring');
var moment = require('moment-timezone');

router.get('/', function (req, res) {
    QnABoards.find({}, function (err, qnas) {
        if (err) res.redirect('/');
        res.render('qna/qna_front', {
            qnas: qnas.slice(0, 10),
            nickname: req.session.nickname
        });
    });
});


router.get('/contents', function (req, res) {
    QnABoards.findOne({
        token: req.query.token
    }, function (err, qnas) {
        if (err) res.redirect('/');
        if (qnas) {
            res.render('qna/qna_contents', {
                qnas: qnas,
                nickname: req.session.nickname
            });

        } else {
            res.send("error");
        }
    });


});


router.get('/search', function (req, res) {
    res.render('qna/qna_search', {
        nickname: req.session.nickname
    });
});

router.post('/search', function (req, res) {
    var data = req.body.data;

    QnABoards.find({
            "title": {
                $regex: ".*" + data + ".*"
            }
        },
        function (err, results) {
            if (err) {
                console.log(err);
            }
            res.render('qna/qna_search', {
                nickname: req.session.nickname,
                data: data,
                results: results
            });
        });
});

router.get('/edit', function (req, res) {
    res.render('qna/qna_edit', {
        nickname: req.session.nickname
    });
});

router.post('/edit', function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var token = rndString.generate();
    var date = moment().tz("Asia/Seoul").format("YYYY.MM.DD");

    var board = new QnABoards({
        writer: req.session.nickname,
        title: title,
        contents: content,
        token: token,
        date: date
    });

    if (req.body.mode === "answer") {
        console.log(req.body);
        QnABoards.update({
            token: req.body.token
        }, {
            $push: {
                A: {
                    writer: req.session.nickname,
                    contents: content,
                    title: title,
                    date: date
                }
            }
        }, function (err, result) {
            if (err) res.redirect('/');
            res.send(true);
        });
    } else {
        board.save(function (err, result) {
            if (err) res.redirect('/qna');
            if (result) res.redirect('/qna');
        });
    }


});



module.exports = router;
