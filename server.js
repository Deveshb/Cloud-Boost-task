
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var clients = []

io.on('connection', function(socket){

	clients.push(socket.handshake.address)
	io.emit('newClient',clients)

	socket.on('disconnect',function(){
		clients = clients.filter( x => x.address != socket.handshake.address.address )
		io.emit('newClient',clients)
	                                 })
                                   });
http.listen(4000,"192.168.1.11", function(){
  console.log('listening on *:4000');
});