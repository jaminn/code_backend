var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  QnABoards.find({}, function(err, qnas){
     if(err) res.redirect('/');
     if(qnas) res.render('qna/qna_Front', {qnas: qnas.slice(0,10)});
     else res.render('qna/qna_Front', {qnas: "null"});
  });
});

router.get('/search', function(req, res) {
    res.render('qna/qna_search');
});

router.get('/contents', function(req, res) {
    // QnABoards.findOne({token:req.query.token},function(err, result){
    //    if(err) res.redirect('/');
    //    if(qnas) res.render('qna/qna_contents',{result:result});
    //    else res.render('qna/qna_search');
    //  });
    QnABoards.findOne({token: req.query.token}, function(err, qnas){
      if(err) res.redirect('/');
      if(qnas) res.render('qna/qna_contents', {qnas: qnas});
      //res.send({err:err,qnas:qnas});
      else res.send("error");
      //res.send({err:err,qnas:qnas});
       //if(err) res.redirect('/');
       //if(qnas) res.render('qna/qna_Front', {qnas: qnas.slice(0,10)});
       //else res.render('qna/qna_Front', {qnas: "null"});
    });


});

router.post('/search', function(req, res) {
    res.render('qna/qna_search');
});

router.get('/write', function(req, res) {
    res.render('qna/qna_write');
});

module.exports = router;
