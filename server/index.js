'use strict'
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 8080;
app.use(express.static('client'));
app.get('/holaMundo', (req, res) => res.status(200).send('Hello World!'));
var messages = [{
    id: 1,
    text: "Bienvenido al chat de Scoket.io y Node",
    nickName: "Bot - Elías Comprés"
}]

io.on('connection', function (socket) {
    console.log("El nodo con IP: " + socket.handshake.address + " se ha conectado");
    socket.emit('messages', messages);
    socket.on('add-message', (data) => {
        messages.push(data);
        io.sockets.emit('messages',messages)
    })
});
server.listen(port, () => console.log(`Example app listening on port port!`))