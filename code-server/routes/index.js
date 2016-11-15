var express = require('express');
var router = express.Router();
var rndString = require('randomstring');
var moment = require('moment-timezone');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("user login: " +req.session.nickname);
  if(req.session.nickname){
    res.render('index', {nickname: req.session.nickname});
  }else{
    res.render('index', {nickname: null});
  }
});


router.get('/search', function(req, res, next) {
  res.render('search');
});
router.post('/search', function(req, res, next) {
  //req.body.search
  res.render('search');
});

router.get('/tuto_edit', function(req, res, next) {
  res.render('tutorial_edit');
});

router.post('/tuto_edit', function(req, res, next) {
  var content = req.body.content;
  console.log(content);
  res.send(true);
});

router.get('/qna_edit', function(req, res, next) {
  res.render('qna_edit');
});

router.post('/qna_edit', function(req, res, next) {
  var content = req.body.content;
  var token = rndString.generate();
  var date = moment().tz("Asia/Seoul").format("YYYY.MM.DD");

  var board = new QnABoards({
     writer: req.session.nickname,
     contents: content,
     token: token,
     date: date
  });

  if(req.body.mode === "answer"){
  QnABoards.update({token: req.body.token},{$push: {A:{
    writer:req.session.nickname,
    contents: content,
    title: "",
    date: date
  }}}, function(err,result){
    if(err) res.redirect('/');
    res.send(true);
    // if(qnas) //res.render('qna/qna_contents', {qnas: qnas});
    // res.send({err:err,qnas:qnas});
    // else res.send("error");
    });
  }else{
    board.save(function (err, result) {
      if(err) res.redirect('/qna');
      if(result) res.redirect('/qna');
    });
  }


});

router.get('/dic_edit', function(req, res, next) {
  res.render('dictionary_edit');
});

router.post('/dic_edit', function(req, res, next) {
  res.send(true);
});

router.get('/blog_edit', function(req, res, next) {
  res.render('blog_edit');
});

router.post('/blog_edit', function(req, res, next) {
  res.send(true);
});


module.exports = router;
