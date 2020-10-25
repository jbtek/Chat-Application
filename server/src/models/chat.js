const mongoose = require('mongoose');
const env = require('../constants/env.config');

const ChatModel = new mongoose.Schema({
        userMessage:String,
        botMessage:Array,
        engagementRate:Number,
        dropOffRate:Number,
        completionRate:Number,
        createdAt:{
            type:Date,
            default:Date.now
        }
    })
    
    module.exports = mongoose.model('Chat', ChatModel);