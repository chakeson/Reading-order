const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    userkey: {
        type:String,
        required:true
    },
    horusHeresy: {
        type: String,
        required: true
    },
    inquisitors: {
        type: String,
        required: true
    },
    imperialGuard: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model("Book", bookSchema);