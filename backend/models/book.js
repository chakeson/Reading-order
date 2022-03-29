const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    userkey: {
        type:String,
        required:true
    },
    userCreatedDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    horusheresy: {
        type: Array,
        required: true
    }
})


module.exports = mongoose.model("bookSchema", bookSchema)