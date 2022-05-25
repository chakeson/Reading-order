const express = require("express");
const Book = require("../models/book");

// CRUD CREATE READ UPDATE DELETE
//      POST   GET  PUT    None
// Deleted via user deletion

// Create books
exports.postBooks = async function(req, res) {
    var inputUserKey = req.user._id;
    var inputHorusHeresy = req.body.horusHeresy;
    var inputInquisitors = req.body.inquisitors;
    var inputImperialGuard = req.body.imperialGuard;

    //console.log(typeof inputHorusHeresy);
    //console.log(inputHorusHeresy);
    // Check if book already exists
    Book.findOne({ userkey: inputUserKey }, function(err, bookentry) {
        // Catch look up/db errors
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        // Catch if book already exists
        else if (bookentry) {
            res.status(400).send("Data already created. Save instead with PUT.");
        } else {
            // Create a new book entry
            var book = new Book({
                userkey: inputUserKey,
                horusHeresy: inputHorusHeresy,
                inquisitors: inputInquisitors,
                imperialGuard: inputImperialGuard
            });
        
            book.save(function(err) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } 
                else {
                    res.status(201).send("Success.");
                }
            });
        }
    });
};

// Update book
exports.putBooks = async function(req, res) {
    var inputUserKey = req.user._id;
    var inputHorusHeresy = req.body.horusHeresy;
    var inputInquisitors = req.body.inquisitors;
    var inputImperialGuard = req.body.imperialGuard;

    Book.findOneAndUpdate({ userkey: inputUserKey }, { horusheresy: inputHorusHeresy }, function(err, book) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else if (book === null) {
            // No book data was found. Create a new one.
            
            // Create a new book entry
            var book = new Book({
                userkey: inputUserKey,
                horusHeresy: inputHorusHeresy,
                inquisitors: inputInquisitors,
                imperialGuard: inputImperialGuard
            });
        
            book.save(function(err) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } 
                else {
                    res.status(201).send("Success.");
                }
            });
            
        }
        else {
            // Update the book progress
            book.horusHeresy = inputHorusHeresy,
            book.inquisitors = inputInquisitors,
            book.imperialGuard = inputImperialGuard
            // Save the book progress and check for errors
            book.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.status(200).send("Succesful save.");
                }
            });
        }
    });
};


// Read user data
exports.getBooks = async function(req, res) {
    var inputUserKey = req.user._id;

    Book.find({ userkey: inputUserKey }, function(err, book) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } 
        else {
            res.status(200).send({"horusHeresy":book[0].horusHeresy, "inquisitors":book[0].inquisitors, "imperialGuard":book[0].imperialGuard});
        }
    });
};