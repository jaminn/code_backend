var express = require('express');
var router = express.Router();
var rndString = require('randomstring');

router.post('/reg', function(req, res) {
    var id = req.body.id;
    var userName = req.body.username;
    var pw = req.body.password;
    var token = rndString.generate();

    var user = new Users({
        userid: id,
        pw: pw,
        userName: userName,
        token: token
    });

    user.save(function(err) {
        if (err) {
              res.redirect('/');
        } else {
              req.session.nickname = user.userName;
              res.redirect('/');
        }
    });
});


router.post('/login', function(req, res) {
    var id = req.body.id;
    var pw = req.body.password;

    console.log(req.body);
    Users.findOne({ userid: id, pw: pw }, function(err, users) {
        if (err) res.redirect('/');
        if (users) {
            console.log(users);
            req.session.nickname = users.userName;
            console.log(req.session.nickname);
            res.redirect('/');
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
