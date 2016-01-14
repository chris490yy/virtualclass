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

    sock.on('questionFromTeacher', (questionJsonFile) => {
        console.log(questionJsonFile);
        sock.emit('questionToStudent', questionJsonFile);
    });

    sock.on('answerFromStudent', (answerJsonFile) => {
        sock.emit('answerToTeacher',answerJsonFile);
    });
});


app.use(express.static(__dirname+'/../client'));

server.listen(8080, () => {
    console.log('listen to 8080');
})