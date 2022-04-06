const { validationResult } = require('express-validator');

exports.validator = (req, res, callback) => {
    const result = validationResult(req).array();
    if (!result.length) { 
        return callback();
    }
  
    const error = result[0].msg;
    res.status(400).json({ success: false, message: error });
};