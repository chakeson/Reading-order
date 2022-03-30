const mongoose = require("mongoose");

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
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return callback(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return callback(err);
            // Override the cleartext password with the hashed one
            user.password = hash;
            callback();
        });
    });
});


module.exports = mongoose.model("User", UserSchema);