var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Abortion = mongoose.model('Abortion');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/abortion', function(req, res, next) {
    Abortion.find(function(err, abortion) {
        if(err) {return next(err);}
        res.json(abortion);
    });
});

module.exports = router;
