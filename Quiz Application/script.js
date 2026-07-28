let questionno = document.getElementById("question-number");
let questionel = document.getElementById("question");
let ansradios = document.querySelectorAll('input[name="option"]');
let optlabel1 = document.getElementById("a");
let optlabel2 = document.getElementById("b");
let optlabel3 = document.getElementById("c");
let optlabel4 = document.getElementById("d");
let scoreel = document.getElementById("score");
let submitbtn = document.getElementById("submit-btn");

const quizData = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
    answer: 1,
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 3,
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    answer: 1,
  },
  {
    question: "Which HTML tag is used to display a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<hyperlink>"],
    answer: 1,
  },
  {
    question: "Which one is a JavaScript framework/library?",
    options: ["Laravel", "Django", "React", "Flask"],
    answer: 2,
  },
  {
    question: "What is the full form of JSON?",
    options: [
      "JavaScript Object Notation",
      "Java Standard Object Notation",
      "JavaScript Oriented Network",
      "Just Simple Object Notation",
    ],
    answer: 0,
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Google", "Netscape", "Apple"],
    answer: 2,
  },
  {
    question: "Which method is used to add an element at the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: 0,
  },
  {
    question: "Which symbol is used for comments in JavaScript (single line)?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: 0,
  },
  {
    question: "What is the correct syntax for referring to an external script?",
    options: [
      "<script href='file.js'>",
      "<script name='file.js'>",
      "<script src='file.js'>",
      "<script file='file.js'>",
    ],
    answer: 2,
  },
];

let currentquestion = 0;
let score = 0;
function showQuestion() {
  let quiz = quizData[currentquestion];
  
  if (currentquestion >= quizData.length) {
    showScore();
  } else {
    questionno.textContent = `Question ${currentquestion + 1}`;
    questionel.textContent = quizData[currentquestion].question;

    optlabel1.textContent = quizData[currentquestion].options[0];
    optlabel2.textContent = quizData[currentquestion].options[1];
    optlabel3.textContent = quizData[currentquestion].options[2];
    optlabel4.textContent = quizData[currentquestion].options[3];
  }
}
let my_arr = Array.from(ansradios);

function checkAnswer() {
  let selectedIndex = null;

  my_arr.forEach((radio, idx) => {
    if (radio.checked) {
      selectedIndex = idx;
    }
  });

  if (selectedIndex === quizData[currentquestion].answer) {
    score++;
  } else {
    console.log("false ans");
  }
}

function unselectAnswer() {
  ansradios.forEach((radio) => {
    radio.checked = false;
  });
}
function showScore() {
  scoreel.textContent = `Your Score Is ${score}/10`;
  if (scoreel.classList.contains("hidden")) {
    scoreel.classList.remove("hidden");
  } else {
    scoreel.classList.add("hidden");
  }
}

showQuestion();
submitbtn.addEventListener("click", () => {
  checkAnswer();
  currentquestion++;
  unselectAnswer();
  showQuestion();
});
