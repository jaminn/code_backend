var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    if (!req.session.nickname) {
        res.render('login');
    } else {
        res.redirect('/');
    }
});


router.post('/', function (req, res) {
    var id = req.body.id;
    var pw = req.body.passwd;
    console.log(id);
    console.log(pw);


    if (id === '' || pw === '') {
        res.redirect('login', {
            wrong: '빈칸을 채워주세요.'
        });
    }

    Users.findOne({
        id: id,
        pw: pw
    }, function (err, users) {
        if (err) res.render('login', {
            wrong: 'Error'
        });
        if (users) {
            console.log(users);
            req.session.nickname = users.username;
            console.log("user login: " + req.session.nickname);

            res.redirect('/');
        } else {
            res.render('login', {
                wrong: '아이디또는 비밀번호가 잘못되었습니다.'
            });
        }
    });
});

module.exports = router;
