// Import express
const express = require("express");
const User = require("../models/user");
const Books = require("../models/book");

// Create a user
exports.postUser = (req, res) => {
    
    var univerifiedUser = req.body.username;
    var univerifiedPassword = req.body.password;
    
    // TODO - Validate the input
    /* From bcrypt docs:
    Per bcrypt implementation, only the first 72 bytes of a string are used. 
    Any extra bytes are ignored when matching passwords. 
    Note that this is not the first 72 characters. 
    It is possible for a string to contain less than 72 characters, 
    while taking up more than 72 bytes (e.g. a UTF-8 encoded string containing emojis).
    */
    const user = new User({
        username: univerifiedUser,
        password: univerifiedPassword
    });

    user.save(function(error) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            res.status(200).send("Successfully created user.");
        }
    });
};


exports.deleteUser = function(req, res) {
    //TODO fix book linking
    Books.findByIdAndRemove({ userkey: userKey, _id: bookID }, function(err, books) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send("Successfully deleted user.");
        }
    });

    User.findByIdAndRemove(req.params.id, function(error) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            res.status(200).send("User successfully deleted.");
        }
    });
};