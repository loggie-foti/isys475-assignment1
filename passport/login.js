var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/LoginUser');
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {
    
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true,
      },
      function(req, email, password, done) { 
        
        if (email)
          email = email.toLowerCase();
        User.findOne({ 'email' :  email }, 
          function(err, user) {
            if (err)
              return done(err);
            if (!user){
              console.log('User Not Found with Email '+ email);
              return done(null, false, 
                    req.flash('message', 'User Not found.'));                 
            }
            if (!isValidPassword(user.local.password, password)){
              console.log('Invalid Password');
              return done(null, false, 
                  req.flash('message', 'Invalid Password'));
            }
            return done(null, user);
          }
        );
    }));
    
    var isValidPassword = function(cipherPass, password){
        return bCrypt.compareSync(password, cipherPass);
    }
};