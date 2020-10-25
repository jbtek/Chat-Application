const fs = require('fs');
const connectDB = require('./src/db/dbconnection');
const ChatModel = require('./src/models/chat');

//Connect to DB
connectDB();
//Read json file
const botMessages = JSON.parse(fs.readFileSync(`${__dirname}/_data/bot.json`, 'utf-8'));

//Import json data to db
const importData = async () => {
    try {
        await ChatModel.create(botMessages);
        console.log('ChatModel data has been inserted into the database');
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

//Import json data to db
const deleteData = async () => {
    try {
        //deleteMany query will delete all the data from database.
        await ChatModel.deleteMany();
        console.log('ChatModel data has been deleted from the database');
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

/**
 * Wrtie the node command to run these above query we use process.argv
 * if we want to run the first method importData:
 * command: node seeder -i[2] //insert
 * if we want to run the second method deleteData
 * command: node seeder -d[2] //delete
 */

 if(process.argv[2] === '-i'){
     importData();
 } else if(process.argv[2] === '-d'){
     deleteData();
 }
