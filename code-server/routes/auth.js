var express = require('express');
var router = express.Router();

router.post('/reg', function(req, res) {
    var id = req.body.id;
    var userName = req.body.username;
    var pw = req.body.password;

    var user = new Users({
        id: id,
        pw: pw,
        userName: userName
    });

    user.save(function(err) {
        if (err) {
            res.redirect('/');
        } else {
            req.session.regenerate(function() {
                req.session.nickname = users.uaserName;
                res.redirect('/');
            });
        }
    });
});


router.post('/login', function(req, res) {
    var id = req.body.id;
    var pw = req.body.password;

    Users.findOne({
        id: id,
        pw: pw
    }, function(err, users) {
        if (err) res.redirect('/');
        if (users) {
            console.log(users);
            req.session.nickname = users.userName;
            res.redirect('/');
        } else {
            res.redirect('/');
        }
    });
});


router.post('/fb', function(req, res) {

});


module.exports = router;
