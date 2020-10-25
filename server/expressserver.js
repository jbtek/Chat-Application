const express = require('express');
const cors = require('cors');
const socket = require('./src/socket/Socket')
const chat = require('./src/routes/chat');
// const morgan = require('morgan');
const connectDB = require('./src/db/dbconnection');
const errorHandler = require('./src/middlewares/errorhandler')
const PORT = process.env.PORT || 8000;
const app = express();
// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With");
// 	res.header("Access-Control-Allow-Headers", "Content-Type");
// 	res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
// 	next();
// });
app.use('*', cors())
//morgan library is for logging in development or production mode.
if(process.env.NODE_ENV == 'development'){
	app.use(morgan('dev'))
}
//Call Mongo Db connection here
connectDB();

//Set Body parser middleware to get req.body in CRUD operations
//Always set it above Router middleware.
app.use(express.json());

//add the auth(user) route here
app.use('/api/v1/chat', chat);
app.use(errorHandler);
const server = app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT);
})
socket.createConnection(server);
//Handle unhandled error rejections
process.on('unhandledRejection', (err, promise) =>{
	//log the error
	console.log(`Error: ${err.message}`);
	//Close server and exit the process with failure(1)
	server.close(() => process.exit(1))
})