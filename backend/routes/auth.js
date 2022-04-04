// Load in dependencies
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const User = require('../models/user');

// Basic passport strategy HTTP
passport.use(new BasicStrategy(
    function(email, password, callback) {
        User.findOne({ email: email }, function (error, user) {
            if (error) { return callback(error); }

            // No user found with that email
            if (!user) { return callback(null, false); }

            // Make sure the password is correct
            user.verifyPassword(password, function(error, isMatch) {
                if (error) { return callback(error); }

                // Password did not match
                if (!isMatch) { return callback(null, false); }

                // Success
                return callback(null, user);
            });
        });
    }
));

// Session turned of so authentication must happen on each call
exports.isAuthenticated = passport.authenticate('basic', { session : false });