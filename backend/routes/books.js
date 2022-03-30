const express = require("express")
const book = require("../models/book")

// CRUD CREATE READ UPDATE DELETE
//      POST   PUT  PUT    None

// Create books
exports.postBooks = async function(req, res) {
    // Verify input
    var unverifiedUserKey = req.body.userkey;
    var unverifiedBook = req.body.book;
    
    // TODO - Verify input
    var verifiedUserKey = unverifiedUserKey;
    var verifiedBook = unverifiedBook;

    var book = new book({
        userkey: unverifiedUserKey,
        book: unverifiedBook
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
    var unverifiedUserKey = req.body.userkey;
    var unverifiedBook = req.body.book;
    
    // TODO - Verify input
    var verifiedBook = unverifiedBook;

    book.findByIdAndUpdate({ userkey: userKey }, { book: verifiedBook }, function(err, books) {
        if (err) {
            console.log(err);
            res.send(err);
        } 
        else {
            res.send("Success.");
        }
    });
};


// Read user data
exports.getBooks = async function(req, res) {
    var userKey = req.body.userkey;

    book.findById({ userkey: userKey }, function(err, books) {
        if (err) {
            console.log(err);
            res.send(err);
        } 
        else {
            res.send(books);
        }
    });
};