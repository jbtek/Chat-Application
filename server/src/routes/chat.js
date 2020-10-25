const express = require('express');
const { getAllChats } = require('../controllers/chat.controller');

//Using express Router to route all the requests.
//work for bootcamp router we need to set mergeParams:true
const router = express.Router();

//get all chats for that user.
router.route('/all').get(getAllChats);

module.exports = router