const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    userkey: {
        type:String,
        required:true
    },
    horusheresy: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("Book", bookSchema);