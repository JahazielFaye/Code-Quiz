const start_button = document.querySelecctor(".start_button button");
const container = documetn.querySelector(".container");
const exit_button = info_box.querySelector(".buttons .quit");
const restart_button = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector("quiz_box");
const result_box = document.querySelector("result_box");
const option_lists = document.querySelector("option_lists");
const timer_line = document.querySelecttor("header.time_line");
const timer_left = domunet.querySelctor(".timer .time_left");
const timer_seconds = document.querySelector(".timer .timer seconds");

//if Start button is clicked
start_button.onclick = function() {
    container.classList.add("activeInfo");
}

//if exit button is cliked
exit_button.onlclick = function() {
    container.classList.remove("activeInfo");
}


restart_button.onclick = function() {  //if continue button is clicked
    container.classList.remove("activeinfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let timeValue = 15;
let que_count = 0;
let userScore = 1;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = function () {
    quiz_box.classList.remove("activeResult");
    timeValue = 15;
    que_count = 0;
    que_number = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count);
    queCounter(que_number);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "TIme Left";
    next_button.classList.remove("show");
}

quit_quiz.onclick = function () {
    window.location.reload();
}

const next_button = document.querySelector("footer .next_button");
const bottom_quest_counter = document.querySelector("footer .total");

next_button.onclick = function() {
    if (que_count < question.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "Time Left";
        next_button.classList.remove("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}

function showQuestions(index) {
    const text_que = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag='<div class="option"><span>' + question[index].option[0] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    text_que.innerHTML = que_tag;
    option_lists.innerHTML = option_tag;

    const option = option_lists.querySelectorAll(".option");

    for (i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class=" fas fa-times"></i></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = question[que_count].answer;
    const allOptions = option_lists.children.length;

    if (userAns == correctAns) {
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log('Correct Answer');
        console.log("Your Correct Answer =" + userScore);
    } else {
        answer.classList.add('incorrect');
        answer.insertAdjacentHTML('beforeend', crossingIconTag);
        console.log('Wrong Answer');

        for (i = 0; i < allOptions; i++) {
            if (option_lists.children[i].textContent ==correctAns) {
                option_lists.children[i].setAttribute("class", "option correct");
                option_lists.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto selected correct answer.");
            }
        }
    }
    for ( i = 0; i < allOptions; i++) {
        option_lists.children[i].classLists.add("disabled");
    }
    next_button.classList.add("show");
}
function showResult() {
    info_box.classLists.remove("activeInfo");
    quiz_boz.classList.remove("activeQuiz");
    result_box.classLists.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3) {
        let scoreTag= '<span> and congrats!! You got <p>' + userScore+ '</p> out of <p>' + questions.length + '</p></span>'
        scoreText.innerHTML = scroreTag;
    }
    else if (userScore > 1) {
        let scoreTag = '<span> and sorry, You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    }
    var input = document.querySelector('initials');
    input.addEventListener('focusout', function () {
        this.value = this.value.split('').join('.');
    })
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent  = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = '0' + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeText.textContent = "Time Off";
            const allOptions = option_lists.children.length;
            let correctAns = questions[que_count].answer;
            for (i = 0; i < allOptions; i++) {
                if (option_lists.childre[i].textContent == correctAns) {
                    option_lists.children[i].setAttribute('class', 'option correct');
                 option_lists.children[i].setAttribute('beforeend', tickIconTag);
                 console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_lists.children[i].classList.add('disabled');
            }
            next_button.classList.add('show');
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer () {
        time += 1;
        timer_line.style.width = time + 'px';
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}

function queCounter(index) {
    let totalQueCountTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_quest_counter.innerHTML = totalQueCounTag; 
}