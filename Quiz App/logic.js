const questions = [
    {
        question: "What is my name?",
        answers: [
            {text: "Aditya", correct: true},
            {text: "Vasudev", correct: false},
            {text: "Sanket", correct: false},
            {text: "Atharva", correct: false}
        ]
    },
    {
        question: "What is my name?",
        answers: [
            {text: "Aditya", correct: false},
            {text: "Vasudev", correct: false},
            {text: "Sanket", correct: true},
            {text: "Atharva", correct: false}
        ]
    },
    {
        question: "What is my name?",
        answers: [
            {text: "Aditya", correct: false},
            {text: "Vasudev", correct: true},
            {text: "Sanket", correct: false},
            {text: "Atharva", correct: false}
        ]
    },
    {
        question: "What is my name?",
        answers: [
            {text: "Aditya", correct: false},
            {text: "Vasudev", correct: false},
            {text: "Sanket", correct: true},
            {text: "Atharva", correct: false}
        ]
    },
];

const questionElement = document.getElementById("question")
const answerButton = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")
let currentQuestionIndex = 0
let score = 0

function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion(){
    resentState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNos = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNos + ". " + currentQuestion.question
    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButton.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resentState(){
    nextButton.style.display = "none"
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++
    } else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true
    });
    nextButton.style.display = "block"
}

function showScore(){
    resentState()
    questionElement.innerHTML = `You scored ${score}`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore()
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    } else{
        startQuiz()
    }
})

startQuiz()