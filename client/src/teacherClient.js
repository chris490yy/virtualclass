'use strict';

var sock = io();

var question = {
    'what is your favorite movie' : ['A','B','C','D']
};

function displayAnswer(answer) {
    console.log('Teacher Client: ' +  answer);
    document.getElementById("result").innerHTML=answer;
}

function init() {
    sock.on('answerToTeacher', displayAnswer);
    sock.emit('questionFromTeacher', question);
}


init();