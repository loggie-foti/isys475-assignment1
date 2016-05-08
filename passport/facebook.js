var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/LoginUser');
var fbConfig = require('../fb.js');

module.exports = function(passport) {
    passport.use('facebook', new FacebookStrategy({
        clientID        : fbConfig.appID,
        clientSecret    : fbConfig.appSecret,
        callbackURL     : fbConfig.callbackUrl,
        profileFields	: ['emails', 'first_name', 'last_name']
    },
    function(access_token, refresh_token, profile, done) {
    	console.log('profile', profile);
		process.nextTick(function() {
			console.log("Profile's Email:" + profile.emails[0].value);
	        User.findOne({ 'email' : profile.emails[0].value }, function(err, user) {

				console.log("User:" + user.id);
	            if (err)
	                return done(err);
	            if (user) {
	            	User.findById(user.id, function (err, user) {
					  if (err) 
					  	done(err);
					  user.facebook.id = profile.id; 	                
	                  user.facebook.token = access_token; 	                
	                  user.facebook.name  = profile.name.firstName + ' ' + profile.name.lastName;
					  user.save(function (err) {
					    if (err) return done(err);
					      return done(null, user); 
					  });
					});
	            } else {
	                var newUser = new User();
					newUser.email = (profile.emails[0].value || '').toLowerCase(); 
	                newUser.facebook.id = profile.id;                
	                newUser.facebook.token = access_token;               
	                newUser.facebook.name  = profile.name.firstName + ' ' + profile.name.lastName;
	                newUser.save(function(err) {
	                    if (err)
	                        throw err;
	                    return done(null, newUser);
	                });
	            }
	        });
        });
    }));
};