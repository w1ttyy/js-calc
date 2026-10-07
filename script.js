function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

let num1 = "";
let num2 = "";
let operator = "";
result = "0";

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "−":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
    default:
      return null;
  }
}

const digitButtons = document.querySelectorAll(".digit");
const decimalButton = document.querySelector(".decimal");
const operatorButton = document.querySelectorAll(".operator");
const resultButton = document.querySelector(".result");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");

clearButton.addEventListener("click", () => {
  num1 = "";
  num2 = "";
  operator = "";
  result = "0";
});

deleteButton.addEventListener("click", () => {
  if (operator === "") {
    num1 = num1.slice(0, -1);
    console.log(num1);
  } else {
    num2 = num2.slice(0, -1);
    console.log(num2);
  }
});

resultButton.addEventListener("click", () => {
  result = operate(operator, Number(num1), Number(num2));
  console.log(result);
});

decimalButton.addEventListener("click", () => {
  if (!num1.includes(".") && operator === "") {
    num1 += decimalButton.textContent;
    console.log(num1);
  } else {
    num2 += decimalButton.textContent;
    console.log(num2);
  }
});

digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (operator === "") {
      num1 += button.textContent;
      console.log(num1);
    } else {
      num2 += button.textContent;
      console.log(num2);
    }
  });
});

operatorButton.forEach((button) => {
  button.addEventListener("click", () => {
    if (operator === "") {
      operator += button.textContent;
    }
    console.log(operator);
  });
});
