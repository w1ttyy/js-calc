// ===== Math operations =====
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

// ===== State =====
let num1 = "";
let num2 = "";
let operator = "";
let result = "0";
let currentOp = "";
let lastOp = "";

// ===== State helpers =====
function appendToCurrentNumber(char) {
  if (operator === "") {
    num1 += char;
  } else {
    num2 += char;
  }
}
function getCurrentNumber() {
  if (operator === "") {
    return num1;
  }
  return num2;
}

// ===== DOM elements =====
const digitButtons = document.querySelectorAll(".digit");
const decimalButton = document.querySelector(".decimal");
const operatorButtons = document.querySelectorAll(".operator");
const resultButton = document.querySelector(".result");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const operationDiv = document.querySelector(".operation");
const resultDiv = document.querySelector(".dispResult");

// ===== Display =====
function updateOperationDiv() {
  operationDiv.textContent = num1 + operator + num2;
}

function updateResultDiv() {
  resultDiv.textContent = result;
}

function clearLastOp() {}
function clearCurrentOp() {
  resultDiv.textContent = "";
}

// ===== Handlers =====
function handleClear() {
  num1 = "";
  num2 = "";
  operator = "";
  result = "0";
  updateResultDiv();
  updateOperationDiv();
}

function handleDelete() {
  if (operator === "") {
    num1 = num1.slice(0, -1);
    updateResultDiv();
  } else {
    num2 = num2.slice(0, -1);
    updateResultDiv();
  }
}

function handleResult() {
  result = operate(operator, Number(num1), Number(num2));
  console.log(result);
  updateResultDiv();
}

function handleDecimal() {
  if (!getCurrentNumber().includes(".")) {
    appendToCurrentNumber(".");
  }
  updateOperationDiv();
}

function handleDigit(char) {
  appendToCurrentNumber(char);
  updateOperationDiv();
}

function handleOperator(op) {
  if (operator === "") {
    operator = op;
  }
  updateOperationDiv();
  clearCurrentOp();
}

// ===== Event listeners =====
deleteButton.addEventListener("click", handleDelete);
clearButton.addEventListener("click", handleClear);
resultButton.addEventListener("click", handleResult);
decimalButton.addEventListener("click", handleDecimal);
digitButtons.forEach((button) => {
  button.addEventListener("click", () => handleDigit(button.textContent));
});
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => handleOperator(button.textContent));
});
