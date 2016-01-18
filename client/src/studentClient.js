'use strict';

var sock = io();

sock.on('connection', function() {
    console.log('Connected to server');
});

sock.on('question', displayQuestion);


function displayQuestion(question) {
    console.log('Student Client ', JSON.stringify(question));
    console.dir(question);
}

var answer = {
    questionId : 1,
    question : 'what is your movie'
}

sock.emit('answer', answer);

function displayAnswer(answer) {
    console.log('student Client: ' +  JSON.stringify(answer));
    document.getElementById("result").innerHTML=answer;
}
