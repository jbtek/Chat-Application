const mongoose = require('mongoose');
const MONGO_URL = 'mongodb+srv://jay1983:jay1983@jbteklearning.g0sw0.mongodb.net/chattest'
const connectDB = async () => {
    const conn = mongoose.connect(MONGO_URL, {
        useNewUrlParser:true,
        useFindAndModify:false,
        useCreateIndex:true,
        useUnifiedTopology:true
    })
    console.log(`Mongo DB connected ${(await conn).connection.host}`);
}

module.exports = connectDB;