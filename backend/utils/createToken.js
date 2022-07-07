require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");

exports.createJWTToken = ( inputEmail, inputAccountType ) => {
    const token = jsonwebtoken.sign({
        email: inputEmail,
        type: inputAccountType,
    }, process.env.JWT_SECRET, 
    {
        expiresIn: '24h'
    });    
    /*
    TODO for future:
    issuer: 'https://www.DOMAIN.TOP_LEVEL_DOMAIN'
    */

    return token;
}