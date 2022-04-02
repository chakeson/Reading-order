const mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


// Excute before each user.save() call to hash the password
UserSchema.pre("save", function (callback) {
    var user = this;

    // Hash the password only if the password has been changed or user is new
    if (!user.isModified("password")) return callback();

    // Password changed so we need to hash it
    bcrypt.genSalt(10, function (error, salt) {
        if (error) return callback(error);

        bcrypt.hash(user.password, salt, null, function (error, hash) {
            if (error) return callback(error);
            // Overroride the cleartext password with the hashed one
            user.password = hash;
            callback();
        });
    });
});


// Compare password input with database hashed password
UserSchema.methods.verifyPassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
        if (error) 
            return callback(error);
            
        callback(null, isMatch);
    });
};



module.exports = mongoose.model("User", UserSchema);