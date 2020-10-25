const jwt = require('jsonwebtoken');
const env = require('../constants/env.config')
const ErrorResponse = require('../utils/errorresponse');
//this is the high order function that handle the error and we no need to put try and catch block in 
//each method. return the resolve promises with same req,res,next and catch error.
const asyncErrorHandler = require('../middlewares/asyncerrorhandler');

const UserModel = require('../models/user');

/**
 * middleware for protecting route to unauthorized user.
 */
exports.protect = asyncErrorHandler(async(req,res,next) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return next(new ErrorResponse('User is not autorized to access this route', 401));
    }

    //if there is token then decode it and verify
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        req.user = await UserModel.findById(decoded.id);
        next();
    } catch (err) {
        return next(new ErrorResponse('User is not autorized to access this route', 401));
    }
})


exports.authorize = (...roles) =>{
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403));
        }

        next();
    }
}