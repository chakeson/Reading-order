const express = require("express");
const Book = require("../models/book");

// CRUD CREATE READ UPDATE DELETE
//      POST   GET  PUT    None

// Create books
exports.postBooks = async function(req, res) {
    // Verify input
    var unverifiedUserKey = req.user._id;
    var unverifiedBook = req.body.book;
    
    // TODO - Verify input
    var verifiedUserKey = unverifiedUserKey;
    var verifiedBook = unverifiedBook;

    // Check if book already exists
    Book.findOne({ userkey: verifiedUserKey }, function(err, bookentry) {
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
                userkey: verifiedUserKey,
                horusheresy: verifiedBook
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
    // Verify input
    var unverifiedUserKey = req.user._id;
    var unverifiedBook = req.body.book;
    
    // TODO - Verify input
    var verifiedBook = unverifiedBook;

    Book.findOneAndUpdate({ userkey: unverifiedUserKey }, { horusheresy: verifiedBook }, function(err, book) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            // Update the book progress
            book.horusheresy = verifiedBook;

            // Save the book progress and check for errors
            book.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.status(200).json(book);
                }
            });
        }
    });
};


// Read user data
exports.getBooks = async function(req, res) {
    var unverifiedUserKey = req.user._id;
    //var unverifiedBookID = req.body.book_id;
    // TODO - Verify input
    var verifiedUserKey = unverifiedUserKey;
    //var verifiedBookID = unverifiedBookID;

    Book.find({ userkey: verifiedUserKey }, function(err, book) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } 
        else {
            res.status(200).send(book);
        }
    });
};