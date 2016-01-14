'use strict';

var sock = io();

var question = {
    'what is your favorite movie' : ['A','B','C','D']
}

sock.on('answerToTeacher', displayAnswer);

function displayAnswer(answer) {
    console.log(answer);
}

sock.emit('questionFromTeacher', question);