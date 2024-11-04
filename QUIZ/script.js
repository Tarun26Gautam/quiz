const questions = [
    {
        question: "Who is Prime minister of India?",
        answers: [
            { text: "(a) Rahul Gandhi (Pappu)", correct: false},
            { text: "(b) Narendra Modi (Mitrooooo)", correct: true},
            { text: "(c) Arvid kerjewal (Daru Piau lagatar...)", correct: false},
            { text: "(d) Sonia Gandhi (Bar dancer )", correct: false},
        ]
    },
    {
        question: "Who is Chief Minister of Uttar Pardesh?",
        answers: [
            { text: "(a) Nitesh Kumar (Paltu)", correct: false},
            { text: "(b) Lalu Yadav (Chara)", correct: false},
            { text: "(c) Akalish Yadav (Toti chor)", correct: false},
            { text: "(d) Yogi Adiyanath (Secular)", correct: true},
        ]
    },
    {
        question: "Who is the first prime minister of India?",
        answers: [
            { text: "(a) Rajiv Gandhi (Tamil Nadu)", correct: false},
            { text: "(b) Indra Gandhi (Teno SHOOT SHOOT kar da...)", correct: false},
            { text: "(c) Pt. Jawaralal Nehru (Eagle cigar)", correct: true},
            { text: "(d) Sadar Balavbhai Patel (Indian ironman)", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world? ",
        answers: [
            { text: "(a) Vatican city", correct: true},
            { text: "(b) India", correct: false},
            { text: "(c) Bhutan (No result found)", correct: false},
            { text: "(d) Sri Lanka", correct: false},
        ]
    },
    {
        question: "Which is the largest contry in the world?",
        answers: [
            { text: "(a) China", correct: false},
            { text: "(b) Canada", correct: false},
            { text: "(c) Russia", correct: true},
            { text: "(d) USA", correct: false},
        ]
    },
    {
        question: "Which is the biggest dessert in the world?",
        answers: [
            { text: "(a) Thar", correct: false},
            { text: "(b) Sahara", correct: true},
            { text: "(c) Kalhari", correct: false},
            { text: "(d) Greenland", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score =0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct"); 
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true"){
             button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You score ${score} out of ${questions.length}!`; 
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();