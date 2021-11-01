// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.querySelector(".timer");
var timerSpanEl = document.querySelector(".timeSpan");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
    // hide start screen
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");
  
    // un-hide questions section
   // questionsEl.removeAttribute("class");
  
    // start timer
    timerId = setInterval(clockTick, 1000);
  
    // show starting time
    //timerEl.textContent = time;
  
    //getQuestion();
  }

  
  
function clockTick() {
    // update time
    time--;
    timerSpanEl.textContent = time;
  
    // check if user ran out of time
    if (time <= 0) {
      quizEnd();
    }
  }

// user clicks button to start quiz
startBtn.onclick = startQuiz;

