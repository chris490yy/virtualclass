'use strict';

var http = require ('http');
var express = require ('express');
var socketio = require ('socket.io');

let app = express();
let server = http.createServer(app);
let io = socketio(server);

io.on('connection', (sock) => {
    sock.on('login', () => {
        console.log('user login');
    });

    sock.on('question', (questionJsonFile) => {
        console.log('Teacher says', questionJsonFile);
        io.emit('question', questionJsonFile);
    });

    sock.on('answer', (answerJsonFile) => {
        console.log('Student says', answerJsonFile);
        io.emit('answer',answerJsonFile);
    });
});


app.use(express.static(__dirname+'/../client'));

server.listen(8080, () => {
    console.log('listen to 8080');
})