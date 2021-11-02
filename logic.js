// variables to reference DOM elements
var questionsEl = document.querySelector("#questions");
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

function endQuiz(){
    clearInterval(timerId);
    var endScreen = document.querySelector("#end-screen");
    endScreen.removeAttribute("class");

    var finalScoreEl = document.querySelector("#final-score");
    finalScoreEl.textContent = time;

    questionsEl.setAttribute("class", "hide");

}

function questionClick(choice){
    if (choice !== questions[currentQuestionIndex].answer){
        time = time - 15;
       feedbackEl.textContent = "Wrong!"
    } else {
        feedbackEl.textContent = "Correct!"
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function(){
        feedbackEl.setAttribute("class", "hide")
    },1000)

    currentQuestionIndex++;

    if(currentQuestionIndex === questions.length){
        alert("ehy")
        endQuiz();
    }else {
        getQuestion();
    }

}

function getQuestion(){
    var currentQuestion = questions[currentQuestionIndex];
    var titleEl = document.querySelector("#question-title");
    titleEl.textContent = "";
    choicesEl.textContent = "";
    titleEl.textContent = currentQuestion.title;
    currentQuestion.choices.forEach(function(el){
        var choiceButton = document.createElement("button")
        choiceButton.value = el;
        choiceButton.textContent = el;
        choicesEl.appendChild(choiceButton);
        choiceButton.addEventListener('click', function(){
            questionClick(this.value)
        })
    })

}

function saveHighscore(){
    var initials = initialsEl.value.trim();
    if(initials != ""){
        var highscores = JSON.parse(window.localStorage.getItem("highScores")) || [];
        var newScore = {
            score: time,
            initials: initials
        }
        highscores.push(newScore);
        window.localStorage.setItem("highScores", JSON.stringify(highscores))
        window.location.href = "highscores.html"
    }
}

function startQuiz() {
    // hide start screen
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");
  
    // un-hide questions section
    questionsEl.removeAttribute("class");
    questionsEl.setAttribute("class", "border")
  
    // start timer
    timerId = setInterval(clockTick, 1000);
    getQuestion();
  }

  
  
function clockTick() {
    // update time
    time--;
    timerSpanEl.textContent = time;
  
    // check if user ran out of time
    if (time <= 0) {
     endQuiz();
    }
  }

// user clicks button to start quiz
startBtn.onclick = startQuiz;

submitBtn.onclick = saveHighscore;
