
'use strict';

var sock = io();
var countOption = 0;

//var optionElements = [];

function displayAnswer(answer) {
    console.log('Teacher Client: ' +  JSON.stringify(answer));
    document.getElementById('questionST').innerHTML = JSON.stringify(answer.question);
    document.getElementById('answerST').innerHTML = JSON.stringify(answer.option);

}

function displaySubmittedQuestion(question){
    //document.getElementById('submittedQuestionST').innerHTML += JSON.stringify(question) + '<br/>';
    var submittedQuestionArea = document.getElementById('submittedQuestionDiv');
    var newSubmittedQuestionP = document.createElement('p');
    newSubmittedQuestionP.setAttribute('id', 'q' + question.questionId)
    newSubmittedQuestionP.innerHTML = 'Question: ' + question.question;
    submittedQuestionArea.appendChild(newSubmittedQuestionP);
    showOptions(submittedQuestionArea, question);
}

function showOptions(submittedQuestionArea,question) {
    var options = question.options;
    for(var index = 0; index < options.length; index++){
        var list = document.createElement('li');
        list.setAttribute('id', 'q' + question.questionId + 'o' + options[index].optionId);
        var newContent=document.createTextNode(options[index].optionValue);
        list.appendChild(newContent);
        submittedQuestionArea.appendChild(list);
    }
}

function addOption() {
    var newOption = document.createElement('li');
    //optionElements.push(newOption);
    addOptionLabel(newOption);
    addOptionInput(newOption);
    addDeleteButton(newOption);
    var options = document.getElementById('options');
    options.appendChild(newOption);
    countOption++;
}

function addOptionInput(newOption) {
    var input = document.createElement('input');
    input.setAttribute('id', countOption);
    newOption.appendChild(input);
}

function addOptionLabel(newOption) {
    var label = document.createElement('label');
    var labelCount = countOption + 1;
    label.innerHTML = 'Option' + labelCount + ':';
    newOption.appendChild(label);
}

function addDeleteButton(newOption) {
    var deleteButton=document.createElement('button');
    deleteButton.innerHTML = 'Remove';    
    deleteButton.addEventListener('click', function(){ 
        document.getElementById('options').removeChild(newOption);
    });
    newOption.appendChild(deleteButton);
}


function setDefaultOptions() {
    addOption();
    addOption();
}

function setQuiz(){  
    var options = [];
    for(var index = 0; index < countOption; index++) {
        var option = document.getElementById('' + index);
        if(option != null){
            var  optionObject = {
                optionId: index+1,
                optionValue: option.value
            }
            options.push(optionObject);
        }      
    }
    var questionValue = document.getElementById('question').value;
    return {
                question: questionValue ,
                options: options
            }
}

function sendQuiz() {
     sock.emit('question', setQuiz());
}

function init() {
    sock.on('answer', displayAnswer);  
    sock.on('question', displaySubmittedQuestion); 
    setDefaultOptions();  
}

init();