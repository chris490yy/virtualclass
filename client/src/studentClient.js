'use strict';

var sock = io();

sock.on('connection', function() {
    console.log('Connected to server');
});

sock.on('questionToStudent', displayQuestion);
sock.on('answerToTeacher', displayAnswer);

function displayQuestion(question) {
    console.log('Student Client ', JSON.stringify(question));
    console.dir(question);
}

var answer = {
    'what is your favorite movie' : 'A'
}

sock.emit('answerFromStudent', answer);

function displayAnswer(answer) {
    console.log('student Client: ' +  answer);
    document.getElementById("result").innerHTML=answer;
}
