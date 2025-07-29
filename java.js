const questions = [
  {
    question: "What is the capital of California?",
    answers: ["Los Angeles", "Sacramento", "San Diego"],
    correct: 1
  },
  {
    question: "What is the capital of Texas?",
    answers: ["Dallas", "Austin", "Houston"],
    correct: 1
  },
  {
    question: "What is the capital of Florida?",
    answers: ["Orlando", "Tallahassee", "Miami"],
    correct: 1
  },
  {
    question: "What is the capital of New York?",
    answers: ["Buffalo", "New York City", "Albany"],
    correct: 2
  },
  {
    question: "What is the capital of Illinois?",
    answers: ["Chicago", "Springfield", "Peoria"],
    correct: 1
  }
];

const quizContainer = document.getElementById("quiz");
const nextButton = document.getElementById("next");
const restartButton = document.getElementById("restart");
const resultContainer = document.getElementById("result");

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function showQuestion(index) {
  answered = false;
  nextButton.disabled = true;
  quizContainer.innerHTML = "";
  resultContainer.textContent = "";

  const questionData = questions[index];
  
  const questionTitle = document.createElement("h3");
  questionTitle.textContent = `${index + 1}. ${questionData.question}`;
  quizContainer.appendChild(questionTitle);

  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("options");

  questionData.answers.forEach((answer, i) => {
    const btn = document.createElement("button");
    btn.textContent = answer;

    btn.addEventListener("click", () => {
      if (answered) return;

      answered = true;
      nextButton.disabled = false;

      const allButtons = optionsDiv.querySelectorAll("button");
      allButtons.forEach(button => button.disabled = true);

      if (i === questionData.correct) {
        btn.classList.add("correct");
        score++;
      } else {
        btn.classList.add("incorrect");
        allButtons[questionData.correct].classList.add("correct");
      }
    });

    optionsDiv.appendChild(btn);
  });

  quizContainer.appendChild(optionsDiv);
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    quizContainer.innerHTML = "";
    nextButton.style.display = "none";
    restartButton.style.display = "inline-block";
    resultContainer.textContent = `Quiz completed! You got ${score} out of ${questions.length} correct.`;
  }
});

restartButton.addEventListener("click", () => {
 
  currentQuestionIndex = 0;
  score = 0;
  nextButton.style.display = "inline-block";
  restartButton.style.display = "none";
  resultContainer.textContent = "";
  showQuestion(currentQuestionIndex);
});


showQuestion(currentQuestionIndex);
