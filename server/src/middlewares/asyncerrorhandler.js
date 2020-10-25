/**
 * this is like a high order function that take a function and return the promises
 * resolve or catch the error.
*/
const asyncErrorHandler = fn => (req,res,next) => Promise.resolve(fn(req,res,next)).catch(next);
module.exports = asyncErrorHandler;

//Equivalant to above.
// const asyncErrorHandler1 = function(fn){
//     return function(req,res,next){
//         return Promise.resolve(fn(req,res,next)).catch(next);
//     }
// }