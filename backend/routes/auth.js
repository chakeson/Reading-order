// Load in dependencies
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const User = require('../models/user');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const requestIp = require('request-ip');
require("dotenv").config();

// Basic passport strategy HTTP
passport.use(new BasicStrategy(
    function(email, password, callback) {

        // Updateds the last login date for the user.
        User.updateLastLoginDate({ email: email }, function(error, user) {
            if (error) { return callback(error); }

            if (!user) { return callback(null, false); }

        });

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
// Failure redirect turned on to stop it from sending "Unauthorized" status 401 
// triggering browsers built in authentication popup.
exports.isAuthenticated = passport.authenticate('basic', { session : false, failureRedirect: '/' });


// JWT passport strategy
// Extracts the JWT from the header and passes it to the verify callback
// The verify callback is called with the decoded token and the done callback
// The done callback is called with the user if the token is valid
// The done callback is called with false if the token is invalid
passport.use(
    new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    function(jwtPayload ,callback) {
        User.findOne({ email: jwtPayload.email }, function(error, user) {
            if (error) {
                return callback(error, false);
            }
            if (user) {
                // Updateds the last login date for the user.
                User.updateLastLoginDate({ email: jwtPayload.email }, function(error, user) {
                    if (error) { return callback(error); }

                    if (!user) { return callback(null, false); }
                });

                return callback(null, user);

            } else {
                return callback(null, false);
            }
        });
    }
));

// Session turned of so authentication must happen on each call
// Failure redirect turned on to stop it from sending "Unauthorized" status 401 
// triggering browsers built in authentication popup.
exports.isAuthenticatedJWT = passport.authenticate('jwt', { session : false, failureRedirect: '/' });


// Google passport strategy

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
    },
    async function(request, accessToken, refreshToken, profile, done) {

        // Check if user already exists, and if so return it to a variable else let it be null.
        var alreadyUser = await User.findOne({ "google.id": profile.id }).exec().then().catch(err => {
            return done(error);
        });

        // Check there is a user already, then update its last accessed IP address and then return it.
        if (alreadyUser) {
            User.updateLastLoginDate({ "google.id": profile.id }, function(error, user) {
                if (error) { return callback(error); }

                if (!user) { return callback(null, false); }
            });

            return done(null, alreadyUser)
        }

        // Otherwise create a new user
        const newUser = new User({
            email: profile.emails[0].value,
            createdIp: requestIp.getClientIp(request),
            updateLastLoginDate: Date.now(),
            token:"",
            google: {
                id: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value
            }
        });
        // Save the new user to the database
        await newUser.save().then(()=>{return done(null, newUser);})
        .catch(error => {
            console.log(error);
            return;
        });
        
        // Then return the new user
        return done(null, newUser);
    }
));

exports.isAuthenticatedGoogle = passport.authenticate("google", {scope: ["email","profile"]});
exports.isAuthenticatedGoogleCallback = passport.authenticate("google", {session:false});