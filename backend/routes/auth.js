// Load in dependencies
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const User = require('../models/user');

// Basic passport strategy HTTP
passport.use(new BasicStrategy(
    function(username, password, callback) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return callback(err); }

            // No user found with that username
            if (!user) { return callback(null, false); }

            // Make sure the password is correct
            user.verifyPassword(password, function(err, isMatch) {
                if (err) { return callback(err); }

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