let numinput1 = document.getElementById("num-input1");
let numinput2 = document.getElementById("num-input2");
let resultbox = document.getElementById("result");
let operator = document.getElementById("show-operation");
let allbtns = document.querySelectorAll("button");

let selectOperator = "";
allbtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    operator.textContent = e.target.textContent;
    selectOperator = e.target.textContent;
    console.log(selectOperator);
  });
  calculateValue();
});

numinput1.addEventListener("change", (e) => {
  calculateValue();
});

numinput2.addEventListener("change", (e) => {
  calculateValue();
});

function calculateValue() {
  let val1 = parseFloat(numinput1.value);
  let val2 = parseFloat(numinput2.value);
  let result = "";

  if (isNaN(val1) || isNaN(val2)) {
    return;
}

  switch (selectOperator) {
    case "+":
      console.log(val1 + val2);
      result = val1 + val2;
      resultbox.textContent = result;
      break;

    case "-":
      console.log(val1 - val2);
      result = val1 - val2;
      resultbox.textContent = result;
      break;

    case "*":
      console.log(val1 * val2);
      result = val1 * val2;
      resultbox.textContent = result;
      break;

    case "/":
      if (val2 === 0) {
        console.log("cannot devide by zero");
        resultbox.textContent = "cannot devide by zero";
        return;
      } else {
        console.log(val1 / val2);
        result = val1 / val2;
        resultbox.textContent = result;
      }
      break;

    default:
      resultbox.textContent = "";
  }
  numinput1.value = "";
  numinput2.value = "";
}
