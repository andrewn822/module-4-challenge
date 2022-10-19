// global variables 
var body = document.body
var startButton = document.getElementById('startBtn')
var qDisplay = document.getElementById('qContent')
var pickA = document.getElementById('optionA')
var pickB = document.getElementById('optionB')
var pickC = document.getElementById('optionC')
var pickD = document.getElementById('optionD')
var score = 0
var secondsLeft = 90
var save = document.getElementById('saveScore')
var initialsInput = document.getElementById('initials')
var initialsSaved = ''
var scoreSaver = document.querySelector('.highScore')
var highScores = document.querySelector('.test')

// highscore leaderboard
function saveclick(event){
    event.preventDefault()
    

    initialsSaved = initialsInput.value
    scoreSaver.setAttribute('style', 'display: block;')

    var addScore = document.createElement('li')
    addScore.textContent = initialsSaved

    highScores.appendChild(addScore)
    

}
// scores from test taken
var messageScore = function(){
    document.querySelector('.scoreOverlay').setAttribute('style', 'display: flex;')
    document.getElementById('numberCorrect').textContent = score;
    document.getElementById('numberWrong').textContent = ((qArray.length)-(score))
    
}

// display quiz questions and answer choices 
function renderQuestions(){
    document.querySelector('.questions').setAttribute('style', 'visibility: visible;')
    currenQuestion = qArray[setQuestion]
    qDisplay.textContent = currenQuestion.question
    pickA.textContent = currenQuestion.choiceA
    pickB.textContent = currenQuestion.choiceB
    pickC.textContent = currenQuestion.choiceC
    pickD.textContent = currenQuestion.choiceD

    return;
}

// list/array of questions 3 of them
var qArray = [
    {
        question: "What does JS stand for?",
        choiceA: "Javascript",
        choiceB: "Junctionscript",
        choiceC: "Java Source",
        choiceD: "Jumbo Shrimp",
        correct: "A"

    },{
        question: "All of the following can be used to declare a variable EXCEPT",
        choiceA: "const",
        choiceB: "var",
        choiceC: "var",
        choiceD: "myvariable",
        correct: "D"
    },{
        question: "Where should the <script></script> go in the HTML document?",
        choiceA: "at the very bottom of the <body>",
        choiceB: "in a <div> tag neara the header",
        choiceC: "In the <head> tag",
        choiceD: "Anywhere because Javascript doesn't have an order",
        correct: "A"
    }
]

// variables for what question and array of question choices
var setQuestion = 0
var currenQuestion = []

// function for right or wrong answers if/else statements
function checkAnswer(value){
    
    currenQuestion = qArray[setQuestion]
    
    if(value === currenQuestion.correct) {
        setQuestion ++;
        score ++;
    }else {
        setQuestion ++;
        secondsLeft = secondsLeft -(10);
    }

    if(setQuestion == qArray.length){
        messageScore();
        
        return;
    }
    
  

    renderQuestions();
    
}


var timer = document.querySelector('.time')

// controls the start of the game and what content is shown based on secondsleft or if you complete the quiz show score
function beginGame(){
    
    document.querySelector('.scoreOverlay').setAttribute('style', 'display: none;')
    setQuestion = 0
    score = 0
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timer.textContent = "Time left: " + secondsLeft

        if(secondsLeft === 0){
            clearInterval(timerInterval) 
            messageScore()}
        
        if(setQuestion == qArray.length){
            clearInterval(timerInterval)
        }

        

    }, 1000);

    renderQuestions();
    
}

save.addEventListener('click', saveclick)
startButton.addEventListener('click', beginGame)