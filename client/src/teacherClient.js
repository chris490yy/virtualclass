'use strict';

var sock = io();

var question = {
    'what is your favorite movie' : ['A','B','C','D']
};

function displayAnswer(answer) {
    console.log('Teacher Client: ' +  JSON.stringify(answer));
    document.getElementById("result").innerHTML=answer;
}

function init() {
    sock.on('answer', displayAnswer);
    sock.emit('question', question);
}


init();