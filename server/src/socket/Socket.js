const io = require('socket.io');
const ChatModel = require('../models/chat');
const Socket = {};
Socket.createConnection = (httpServer) => {
    const socketInstance = io(httpServer);
    socketInstance.on('connection', socket => {
       socket.on('sub', recievedMessage)
       socket.on('unsub', unsubscribeMessage);
       socket.on('disconnect', onDisconnect);
    })
    const recievedMessage = async(data, callback) => {
        console.log('subscribed an event');
        // console.log('sub data::', data);
        const objChat = await getAndGenerateChatData(data);
        if(objChat){
            if(objChat.botMessage.length){
                sendMessage(objChat.botMessage, callback);
            } else{
                socketInstance.emit('data', 'Bot: See you again. Bye !');
                callback('Bot: See you again. Bye !') 
            }
        } else {
            socketInstance.emit('data', 'Bot: How can I help you today?'); 
            callback('Bot: How can I help you today?');
        }
    }

    const sendMessage = (botMessage, callback) => {
        for(let i = 0; i< botMessage.length; i++){
            setTimeout(() => {
                socketInstance.emit('data', botMessage[i]);
                callback(botMessage[i])
            }, 1000*(i+1));
        }
    }

    const getAndGenerateChatData = async(data) => {
        const {userMessage} = data;
        let objChat = await ChatModel.findOne(
            { userMessage }
          )
        return objChat;
    }

    const unsubscribeMessage = (data) => {
        console.log('Unsubscribed an event');
    }

    const onDisconnect = () => {
        console.log('Disconnect.......');
    }
    
    
}
module.exports = Socket;