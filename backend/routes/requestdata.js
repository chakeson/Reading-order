const express = require("express");
const Book = require("../models/book");
const User = require("../models/user");

exports.getData = async function(req, res) {
    var inputUserKey = req.user._id;
    var users;
    var books;
    
    try {
        users = await User.findById(inputUserKey);
        books = await Book.findOne({ userkey: inputUserKey });
    } catch (error) {
        users="User error";
        books="Book error";
    }

    res.status(200).send({ users, books });
    return;
}
