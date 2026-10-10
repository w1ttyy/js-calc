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

function roundResult(value) {
  // 8 decimal places is enough and keeps long decimals off the display
  return Math.round(value * 1e8) / 1e8;
}

// ===== State =====
let num1 = "";
let num2 = "";
let operator = "";
let isResultShown = false; // true after "=" or an error, so a new digit starts fresh

// ===== State helpers =====
function getCurrentNumber() {
  if (operator === "") {
    return num1;
  }
  return num2;
}

function appendToCurrentNumber(char) {
  if (operator === "") {
    num1 += char;
  } else {
    num2 += char;
  }
}

function resetState() {
  num1 = "";
  num2 = "";
  operator = "";
  isResultShown = false;
}

// Calculates num1 operator num2, shows the result in the bottom line
// and stores it as the new num1.
// Returns false when it can't (division by zero), so callers can stop.
function evaluate() {
  const a = Number(num1);
  const b = Number(num2);

  if (operator === "÷" && b === 0) {
    showError();
    return false;
  }

  num1 = String(roundResult(operate(operator, a, b)));
  num2 = "";
  operator = "";
  updateResultDiv(num1);
  return true;
}

// Starts a new calculation if a result (or error) is on the display
function startFreshIfResultShown() {
  if (isResultShown) {
    num1 = "";
    isResultShown = false;
    updateResultDiv("");
  }
}

// ===== DOM elements =====
const digitButtons = document.querySelectorAll(".digit");
const decimalButton = document.querySelector(".decimal");
const operatorButtons = document.querySelectorAll(".operator");
const resultButton = document.querySelector(".result");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const operationDiv = document.querySelector(".operation"); // top, small
const resultDiv = document.querySelector(".dispResult"); // bottom, big

// ===== Display =====
function updateOperationDiv() {
  operationDiv.textContent = num1 + operator + num2 || "0";
}

function updateResultDiv(text) {
  resultDiv.textContent = text;
}

function showError() {
  resetState();
  isResultShown = true; // next digit clears the message
  updateOperationDiv();
  updateResultDiv("MATH ERROR");
}

// ===== Handlers =====
function handleClear() {
  resetState();
  updateOperationDiv();
  updateResultDiv("");
}

function handleDigit(char) {
  startFreshIfResultShown();
  appendToCurrentNumber(char);
  updateOperationDiv();
}

function handleOperator(op) {
  // nothing to operate on yet
  if (num1 === "") return;

  // full pair already entered (12 + 7 −) → evaluate it first
  if (num2 !== "") {
    if (!evaluate()) return;
  }

  // also covers consecutive operators: the last one wins
  operator = op;
  isResultShown = false;
  updateOperationDiv();
}

function handleResult() {
  // "=" only works with two numbers and an operator
  if (num1 === "" || operator === "" || num2 === "") return;

  const expression = num1 + operator + num2;
  if (evaluate()) {
    isResultShown = true;
    operationDiv.textContent = expression + "=";
  }
}

// ===== Handlers: extra credit (decimal, backspace) =====
function handleDecimal() {
  startFreshIfResultShown();
  if (getCurrentNumber() === "") {
    appendToCurrentNumber("0");
  }
  if (!getCurrentNumber().includes(".")) {
    appendToCurrentNumber(".");
  }
  updateOperationDiv();
}

function handleDelete() {
  // deleting from a result would be confusing, so start fresh instead
  if (isResultShown) {
    handleClear();
    return;
  }

  if (num2 !== "") {
    num2 = num2.slice(0, -1);
  } else if (operator !== "") {
    operator = "";
  } else if (num1 !== "") {
    num1 = num1.slice(0, -1);
  }
  updateOperationDiv();
}

// ===== Event listeners =====
clearButton.addEventListener("click", handleClear);
resultButton.addEventListener("click", handleResult);
digitButtons.forEach((button) => {
  button.addEventListener("click", () => handleDigit(button.textContent));
});
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => handleOperator(button.textContent));
});

// extra credit
decimalButton.addEventListener("click", handleDecimal);
deleteButton.addEventListener("click", handleDelete);

// ===== Init =====
updateOperationDiv();
