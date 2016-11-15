var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.nickname);
  if(req.session.nickname){
    res.render('index', {nickname: req.session.nickname});
  }else{
    res.render('index', {nickname: null});
  }
});

module.exports = router;
