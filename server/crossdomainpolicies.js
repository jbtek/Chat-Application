const app = require('express')();
// const cors = require('cors');
// const referrerPolicy = require('referrer-policy');

const server = require('http').createServer(app);
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
	next();
});
const options = { origins:'*:*' };
const io = require('socket.io')(server, options);

io.on('connection', socket => { 
	console.log('HIII:')
 });

server.listen(8090);
// app.use(referrerPolicy());
// app.use('*', cors());