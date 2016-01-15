'use strict';

var sock = io();
var countOption = 0;

function displayAnswer(answer) {
    console.log('Teacher Client: ' +  JSON.stringify(answer));
    document.getElementById('questionST').innerHTML = JSON.stringify(answer.question);
    document.getElementById('answerST').innerHTML = JSON.stringify(answer.option);

}

function init() {
    sock.on('answer', displayAnswer);  
    setDefaultOptions();  
}

function addOption() {
    var newOption = document.createElement('li');
    var label = document.createElement('label');
    var labelCount = countOption + 1;
    label.innerHTML = 'Option' + labelCount + ':';
    var input = document.createElement('input');
    input.setAttribute('id', countOption);
    countOption++;
    newOption.appendChild(label);
    newOption.appendChild(input);
    var options = document.getElementById('options');
    options.appendChild(newOption);
}


function setDefaultOptions() {
    addOption();
    addOption();
}

function deleteOption() {
    var options = document.getElementById('options');
    var option =document.getElementById((countOption -1).toString());
    options.removeChild(option.parentNode);
    countOption--;
}

function setQuiz(){ 
    var options = [];
    for(var index = 0; index < countOption; index++) {
        var option = document.getElementById((index).toString()).value;
        options.push(option);
    }
    var questionOne = document.getElementById('question').value;
    return {question: questionOne ,
                options: options};
};

function clearQuizInput() {
    var questionOne = document.getElementById('question').value = "";
    
    for(var index = 0; index < countOption; index++) {
        document.getElementById((index).toString()).value  =  "";
    }
}

function sendQuiz() {
     sock.emit('question', setQuiz());
     clearQuizInput();
}

init();