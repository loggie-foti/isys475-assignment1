var LinkedInStrategy = require('passport-linkedin').Strategy;
var User = require('../models/LoginUser');
var liConfig = require('../linkedin.js');

module.exports = function(passport) {

    passport.use('linkedin', new LinkedInStrategy({
        consumerKey     : liConfig.appID,
        consumerSecret  : liConfig.appSecret,
        callbackURL     : liConfig.callbackUrl,
        profileFields	: ['id', 'first-name', 'last-name', 'email-address', 'headline']
    },
    function(token, tokenSecret, profile, done) {
		process.nextTick(function() {
	        User.findOne({ 'email' : profile._json.emailAddress }, function(err, user) {
	            if (err)
	                return done(err);
	            if (user) {
	            	
	            	User.findById(user.id, function (err, user) {
					  if (err) 
					  	done(err);
					  user.linkedin.id = profile.id; 	                
	                  user.linkedin.displayName = profile.displayName;              
					  user.save(function (err) {
					    if (err) return done(err);
					      return done(null, user); 
					  });
					});
					
	            } else {
	                var newUser = new User();
					newUser.email = (profile.email-address || '').toLowerCase(); 
	                newUser.linkedin.id = profile.id;               
	                newUser.linkedin.displayName  = profile.displayName
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