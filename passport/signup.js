var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/User');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true 
        },
        function(req, username, password, done) {

           var findOrCreateUser = function(){
                User.findOne({ 'username' :  username }, function(err, user) {
                    if (err){
                        console.log('Signup Error: '+err);
                        return done(err);
                    }
                    if (user) {
                        console.log('User Already Registered with Username: ');
                        return done(null, false, req.flash('message','User Already Registered'));
                    } else {
                        var newUser = new User();
                        newUser.username = username;
                        newUser.password = createHash(password);
                        newUser.email = req.param('email');
                        newUser.firstName = req.param('firstName');
                        newUser.lastName = req.param('lastName');
                        newUser.save(function(err) {
                            if (err){
                                console.log('Save Error: '+err);  
                                throw err;  
                            }
                            console.log('Registration Succesful');    
                            return done(null, newUser);
                        });
                    }
                });
            };
            process.nextTick(findOrCreateUser);
        })
    );
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}