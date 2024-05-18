const questions = [
    {
        question: 'What is the capital of India?',
        answers: [
            { text: 'Mumbai', correct: false },
            { text: 'New Delhi', correct: true },
            { text: 'Kolkata', correct: false },
            { text: 'Chennai', correct: false }
        ]
    },
    {
        question: 'Who was the first Prime Minister of India?',
        answers: [
            { text: 'Mahatma Gandhi', correct: false },
            { text: 'Jawaharlal Nehru', correct: true },
            { text: 'Indira Gandhi', correct: false },
            { text: 'Rajendra Prasad', correct: false }
        ]
    },
    {
        question: 'Which river is known as the Ganga of the South?',
        answers: [
            { text: 'Godavari', correct: false },
            { text: 'Krishna', correct: false },
            { text: 'Kaveri', correct: true },
            { text: 'Narmada', correct: false }
        ]
    },
    {
        question: 'Which Indian city is also known as the "Silicon Valley of India"?',
        answers: [
            { text: 'Hyderabad', correct: false },
            { text: 'Mumbai', correct: false },
            { text: 'Bangalore', correct: true },
            { text: 'Pune', correct: false }
        ]
    },
    {
        question: 'Who wrote the national anthem of India?',
        answers: [
            { text: 'Bankim Chandra Chatterjee', correct: false },
            { text: 'Rabindranath Tagore', correct: true },
            { text: 'Sarojini Naidu', correct: false },
            { text: 'Subramania Bharati', correct: false }
        ]
    },
    {
        question: 'Which festival is known as the festival of lights in India?',
        answers: [
            { text: 'Holi', correct: false },
            { text: 'Diwali', correct: true },
            { text: 'Eid', correct: false },
            { text: 'Navratri', correct: false }
        ]
    },
    {
        question: 'Who is known as the "Missile Man of India"?',
        answers: [
            { text: 'Homi J. Bhabha', correct: false },
            { text: 'Vikram Sarabhai', correct: false },
            { text: 'A. P. J. Abdul Kalam', correct: true },
            { text: 'C. V. Raman', correct: false }
        ]
    },
    {
        question: 'Which is the highest civilian award in India?',
        answers: [
            { text: 'Padma Shri', correct: false },
            { text: 'Bharat Ratna', correct: true },
            { text: 'Padma Bhushan', correct: false },
            { text: 'Padma Vibhushan', correct: false }
        ]
    },
    {
        question: 'Which Indian state has the longest coastline?',
        answers: [
            { text: 'Gujarat', correct: true },
            { text: 'Tamil Nadu', correct: false },
            { text: 'Maharashtra', correct: false },
            { text: 'Andhra Pradesh', correct: false }
        ]
    },
    {
        question: 'Who is known as the Father of the Indian Constitution?',
        answers: [
            { text: 'Mahatma Gandhi', correct: false },
            { text: 'B. R. Ambedkar', correct: true },
            { text: 'Jawaharlal Nehru', correct: false },
            { text: 'Sardar Patel', correct: false }
        ]
    }
];

const questionElement = document.querySelector('.questions');
const answerButtonsElement = document.getElementById('option_container');
const ansBox = document.getElementsByClassName('option_button');
const nextButton = document.getElementById('next_question');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

let currentQuestionIndex = 0;
let selectedAnswer = null;
let score = 0;
let timeLeft = 200;
let timer;

function start_now() {
    document.getElementById('start_container').style.display = 'none';
    document.getElementById('container').style.display = 'flex';
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = score;
    timeLeft = 200;
    startTimer();
    setNextQuestion();
}

Array.from(ansBox).forEach(button => {
    button.addEventListener('click', function (e) {
        selectedAnswer = e.target;
        Array.from(ansBox).forEach(btn => btn.classList.remove('selected'));
        selectedAnswer.classList.add('selected');
    });
});

nextButton.addEventListener('click', function() {
    if (selectedAnswer != null) {
        const correct = questions[currentQuestionIndex].answers.find(answer => answer.text === selectedAnswer.textContent).correct;
        if (correct) {
            score++;
        }
        scoreElement.textContent = score;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setNextQuestion();
        } else {
            clearInterval(timer);
            alert('Quiz finished! Your score: ' + score);
            resetQuiz();
        }
    } else {
        alert('Please select an answer before proceeding.');
    }
});

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.textContent = question.question;
    question.answers.forEach((answer, index) => {
        ansBox[index].textContent = answer.text;
        ansBox[index].classList.remove('correct', 'wrong');
    });
}

function resetState() {
    selectedAnswer = null;
    Array.from(ansBox).forEach(button => button.classList.remove('selected'));
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Time is up! Your score: ' + score);
            resetQuiz();
        }
    }, 1000);
}

function resetQuiz() {
    document.getElementById('start_container').style.display = 'flex';
    document.getElementById('container').style.display = 'none';
}
