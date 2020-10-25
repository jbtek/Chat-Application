//Dependencies here
const ErrorResponse = require('../utils/errorresponse');
//this is the high order function that handle the error and we no need to put try and catch block in 
//each method. return the resolve promises with same req,res,next and catch error.
const asyncErrorHandler = require('../middlewares/asyncerrorhandler');

const ChatModel = require('../models/chat');
/**
 * User  Registeration GET request.
 * @ChatRoute: get /api/v1/chat/all
 * @access:Public
 */
exports.getAllChats  = asyncErrorHandler(async (req,res,next) => {
    //Password is hashed in model in pre middleware.
    const chats = await ChatModel.find();
    if(!chats){
        return next(new ErrorResponse('No chats found for this user', 404));
    }
    /**
     * here we can add createdAt(chat data and time).
     */
    let chatMessages = [];
    for(let item of chats){
        if(item.userMessage !== ''){
            chatMessages.push(item.userMessage.toString());
        }
        if(item.botMessage && item.botMessage.length > 1){
            for(let bot of item.botMessage){
                chatMessages.push(bot.toString());
            }
        } else{
            if(item.botMessage){
                chatMessages.push(item.botMessage.toString());
            }
        }
    }
    // console.log('chatMessages::', chatMessages)
    res.status(200).json({
        success:true,
        data: chats,
        chatMessages
    })
})