var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var GraphData = mongoose.model('Abortion');

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}

module.exports = function(passport) {
	router.get('/', function(req, res) {
		res.render('index', { message: req.flash('message') });
	});
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/profile',
		failureRedirect: '/',
		failureFlash : true  
	}));
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash : true  
	}));
	router.get('/profile', isAuthenticated, function(req, res){
		res.render('profile', { user: req.user });
	});
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	router.get('/login/facebook', 
		passport.authenticate('facebook', { scope : 'email' }
	));
	router.get('/login/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		})
	);
	router.get('/login/linkedin', 
		passport.authenticate('linkedin'));
		
	router.get('/login/linkedin/callback',
		passport.authenticate('linkedin', {
			successRedirect : '/profile',
			failureRedirect : '/'
		})
	);
	router.get('/abortiondemos', isAuthenticated, function(req, res, next) {
	  GraphData.find({}, {_id: 0}, function(err, data){
	  if(err){ return next(err); }
	  	res.json(data);
	  });
	});
	return router;
}
