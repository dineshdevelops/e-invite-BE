const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userSchema.model');

const protectAPI = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Get Token from Header
            token = req.headers.authorization.split(' ')[1];
            //Verify token
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            //Get UserId from decoded Token
            req.user = await User.findById(decoded.id).select('-password');
            next()
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not Authorized');
        }
    }
    else{
        res.status(400);
        throw new Error('Bearer Token Missing')
    }
})

module.exports = protectAPI