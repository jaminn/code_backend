var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    if (!req.session.nickname) {
        res.render('signup');
    } else {
        res.redirect('/');
    }
});


router.post('/', function (req, res) {
    var username = req.body.username;
    var id = req.body.id;
    var pw = req.body.passwd;

    console.log(res.body);

    var user = new Users({
        id: id,
        pw: pw,
        username: username
    });

    user.save(function (err, data) {
        if (err) {
            console.log(err);
            res.render('signup', {
                wrong: "이미 같은 아이디또는 유저의 이름이 있습니다."
            });
        } else {
            req.session.nickname = user.username;
            res.redirect('/');
        }
    });
});


module.exports = router;
