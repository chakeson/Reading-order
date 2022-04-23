// Import express
const express = require("express");
var bcrypt = require("bcrypt-nodejs");
const User = require("../models/user");
const Books = require("../models/book");

// Post - Create user
// Put - Update password
// Delete - Delete user and associated books.



// Create a user
exports.postUser = (req, res) => {
    var inputUserKey = req.body.email;
    var inputPassword = req.body.password;

    /* From bcrypt docs:
    Per bcrypt implementation, only the first 72 bytes of a string are used. 
    Any extra bytes are ignored when matching passwords. 
    Note that this is not the first 72 characters. 
    It is possible for a string to contain less than 72 characters, 
    while taking up more than 72 bytes (e.g. a UTF-8 encoded string containing emojis).
    */
    
    // Check if email is already taken if not create a new user
    User.findOne({ email: inputUserKey }, function(err, user) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        if (user) {
            res.status(400).send("Email already taken.");
            return;
        } else {
            const user = new User({
                email: inputUserKey,
                password: inputPassword
            });
            
            try {
                user.save(function(error) {
                    if (error) {
                        console.log(error);
                        res.status(500).send(error);
                    } else {
                        res.status(200).send("Successfully created user.");
                    }
                });
            } catch (error) {
                res.status(500).send(error);
            }
        };
    });
};


// Update password
exports.putUser = (req, res) => {
    var inputUserKey = req.user._id;
    var newPassword = req.body.password;

    User.findOne({ _id: inputUserKey }, function(err, user) {
        if (err) {
            console.log(err);
        }
        else {
            user.password = newPassword;

            user.save(function(error) {
                if (error) {
                    console.log(error);
                    res.status(500).send(error);
                } else {
                    res.status(200).send("Successfully updated password.");
                }
            });
        }
    });
};



exports.deleteUser = function(req, res) {
    var inputUserKey = req.user._id;

    var successMessage;
    Books.findOneAndRemove({ userkey: inputUserKey }, function(err, books) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            successMessage ="Successfully deleted books record.";
        }
    });

    User.findByIdAndRemove(inputUserKey, function(error) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            res.status(200).send("User successfully deleted. "+successMessage);
        }
    });
};