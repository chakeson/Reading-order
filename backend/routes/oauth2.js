const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user");
//const user = require("./models/user");

// Google
exports.GoogleOAuth2Callback = async function( req , res ) {
    const token = jsonwebtoken.sign({
        email: req.user.email,
    }, process.env.JWT_SECRET, 
    {
        expiresIn: '24h'
    });
    /*
    TODO for future:
    issuer: 'https://www.DOMAIN.TOP_LEVEL_DOMAIN'
    */

    // Cookie containing the token. Expiration date set to 24h from creation time.
    res.cookie( "jwt" , token , { sameSite:"None", secure:true, expires: new Date( Date.now() + 24*60*60*1000 ) } ).redirect(process.env.FRONTEND_ADDRESS);

    var savedUser = await User.findOneAndUpdate({ "google.id": req.user.google.id }, {token:token});
    return;
}


// Facebook
exports.FacebookOAuth2Callback = async function( req , res ) {
    const token = jsonwebtoken.sign({
        email: req.user.email,
    }, process.env.JWT_SECRET, 
    {
        expiresIn: '24h'
    });
    /*
    TODO for future:
    issuer: 'https://www.DOMAIN.TOP_LEVEL_DOMAIN'
    */

    // Cookie containing the token. Expiration date set to 24h from creation time.
    res.cookie( "jwt" , token , { sameSite:"None", secure:true, expires: new Date( Date.now() + 24*60*60*1000 ) } ).redirect(process.env.FRONTEND_ADDRESS);

    var savedUser = await User.findOneAndUpdate({ "facebook.id": req.user.facebook.id }, {token:token});
    return;
}