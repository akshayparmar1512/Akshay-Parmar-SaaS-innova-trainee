let userinput = document.getElementById("user-input");
let submitbtn = document.getElementById("submit-btn");
let showhint = document.getElementById("hint");
let showattempt = document.getElementById("attempt");
let playagainbtn = document.getElementById("play-again");

let attempts = 0;
let randomnum = Math.floor(Math.random() * 100 + 1);

function playGame() {

  if (userinput.value.trim() === "") {
    alert("Please enter a number.");
    return; 
  }
  attempts++;

  let usernum = Number(userinput.value);

  if (usernum > randomnum) {
    console.log("number is high");
    showhint.textContent = "Number is High";
  } else if (usernum < randomnum) {
    console.log("number is low");
    showhint.textContent = "Number is Low";
  } else {
    console.log("you guess the correct number");
    showhint.textContent = "you guess the correct number";
  }
  userinput.value = "";
  showattempt.textContent = `You Tried ${attempts} Times`;
}

function playAgain() {
  attempts = 0;
  randomnum = Math.floor(Math.random() * 100 + 1);
  showhint.textContent = "";
  showattempt.textContent = "";

  //   playGame();
  console.log(attempts);
  console.log(randomnum);
}

submitbtn.addEventListener("click", () => {
  playGame();
});

playagainbtn.addEventListener("click", () => {
  playAgain();
});
