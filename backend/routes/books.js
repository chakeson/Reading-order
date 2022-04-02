const express = require("express");
const Book = require("../models/book");

// CRUD CREATE READ UPDATE DELETE
//      POST   PUT  PUT    None

// Create books
exports.postBooks = async function(req, res) {
    // Verify input
    var unverifiedUserKey = req.user._id;
    var unverifiedBook = req.body.book;
    
    // TODO - Verify input
    var verifiedUserKey = unverifiedUserKey;
    var verifiedBook = unverifiedBook;

    // TODO Check if book already exists

    var book = new Book({
        userkey: verifiedUserKey,
        horusheresy: verifiedBook
    });

    book.save(function(err) {
        if (err) {
            console.log(err);
            res.send(err);
        } 
        else {
            res.send("Success.");
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
            res.send(err);
        }
        // Update the existing beer quantity
        book.horusheresy = verifiedBook;

        // Save the beer and check for errors
        book.save(function(err) {
            if (err)
                res.send(err);
        });

        res.json(book);
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
            res.send(err);
        } 
        else {
            res.send(book);
        }
    });
};