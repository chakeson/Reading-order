const User = require("../models/user");
const { createJWTToken } = require("../utils/createToken");

// Google
exports.GoogleOAuth2Callback = async function( req , res ) {
    
    const token = createJWTToken( req.user.email , "google" );

    // Cookie containing the token. Expiration date set to 24h from creation time.
    res.cookie( "jwt" , token , { sameSite:"None", secure:true, expires: new Date( Date.now() + 24*60*60*1000 ) } ).redirect(process.env.FRONTEND_ADDRESS);

    var savedUser = await User.findOneAndUpdate({ "google.id": req.user.google.id }, {token:token});
    return;
}


// Facebook
exports.FacebookOAuth2Callback = async function( req , res ) {

    const token = createJWTToken( req.user.email , "facebook" );
    
    // Cookie containing the token. Expiration date set to 24h from creation time.
    res.cookie( "jwt" , token , { sameSite:"None", secure:true, expires: new Date( Date.now() + 24*60*60*1000 ) } ).redirect(process.env.FRONTEND_ADDRESS);

    var savedUser = await User.findOneAndUpdate({ "facebook.id": req.user.facebook.id }, {token:token});
    return;
}