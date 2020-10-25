const ErrorResponse = require("../utils/errorresponse");

//Custom error handler function/middleware.
const errorHandler = (err, req, res, next) => {
    //console error stack trace
    console.log('error stack::', err);
    let error = {...err};
    error.message = err.message;
    //Handle the bad object ID(bootcamp ID): mongoose error handling..
    if(err.name === 'CastError'){
        const message = `Bootcamp not found with id of ${err.value}`
        error = new ErrorResponse(message, 404);
    }

    //Mongoose duplicate field error handle
    if(err.code === 11000){
        const message = `Duplicate field is entered`
        error = new ErrorResponse(message, 400);
    }

    //Mongoose Validation error handle
    if(err.name = 'ValidationError'){
        console.log('eror________:',err.errors);
        if(err.errors){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
        }
    }

    res.status(error.statusCode || 500).json({
        success:false,
        error:error.message || 'Server Error'
    })
}
module.exports = errorHandler