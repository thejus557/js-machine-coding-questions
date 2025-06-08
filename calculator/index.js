const intializeApp = () => {};

const operators = ["+", "-", "*", "/"];

const IDS = {
  expressionInput: "#expression-input",
};

const DOM_CACHE = {
  elements: {},

  getElements: (ID) => {
    if (ID in DOM_CACHE.elements) {
      return DOM_CACHE.elements[ID];
    } else {
      const ele = document.querySelector(ID);
      DOM_CACHE.elements[ID] = ele;
      return DOM_CACHE.elements[ID];
    }
  },
};

const otherOp = ["c", "="];
let numbersStack = [];
let opStack = [];
let expressionString = "";
let numberString = "";
let isLastAnOperand = false;

const handleAddToString = (e) => {
  if (!otherOp.includes(e) && !operators.includes(e)) {
    // case number;
    numberString = numberString + e;
    isLastAnOperand = false;
    concatinateAndAppendToDOM(e);
  } else if (operators.includes(e) && !isLastAnOperand) {
    // operand case

    isLastAnOperand = true;
    if (numberString.length) {
      numbersStack.push(numberString);
      numberString = "";
    }
    opStack.push(e);

    concatinateAndAppendToDOM(e);
  } else if (e === "c") {
    clearAllFn();
  } else if (e === "=") {
    if (numberString.length) {
      numbersStack.push(numberString);
      numberString = "";
    }

    if (isLastAnOperand || numbersStack.length === 0) {
      return;
    }
    const result = handleCalculate();
    appendCalculatedResultToInput(result);
    isLastAnOperand = false;
  }
};

const appendCalculatedResultToInput = (result) => {
  if (!isNaN(Number(result))) {
    DOM_CACHE.getElements(IDS.expressionInput).value = result;
    expressionString = result;
    numbersStack = [result.toString()];
    opStack = [];
  }
};

const handleCalculate = () => {
  let tempNumbers = [...numbersStack];
  let tempOps = [...opStack];

  for (let i = 0; i < tempOps.length; i++) {
    if (tempOps[i] === "*" || tempOps[i] === "/") {
      const a = Number(tempNumbers[i]);
      const b = Number(tempNumbers[i + 1]);
      const operator = tempOps[i];

      let result;
      if (operator === "*") {
        result = a * b;
      } else {
        result = a / b;
      }

      tempNumbers.splice(i, 2, result);
      tempOps.splice(i, 1);
      i--;
    }
  }

  // Handle addition and subtraction
  for (let i = 0; i < tempOps.length; i++) {
    if (tempOps[i] === "+" || tempOps[i] === "-") {
      const a = Number(tempNumbers[i]);
      const b = Number(tempNumbers[i + 1]);
      const operator = tempOps[i];

      let result;
      if (operator === "+") {
        result = a + b;
      } else {
        result = a - b;
      }

      tempNumbers.splice(i, 2, result);
      tempOps.splice(i, 1);
      i--;
    }
  }

  return tempNumbers[0];
};

const clearAllFn = () => {
  numbersStack = [];
  opStack = [];
  expressionString = "";
  numberString = "";
  isLastAnOperator = false;
  DOM_CACHE.getElements(IDS.expressionInput).value = "";
};

const concatinateAndAppendToDOM = (e) => {
  expressionString = expressionString + e;
  DOM_CACHE.getElements(IDS.expressionInput).value = expressionString;
};

document.addEventListener("DOMContentLoaded", intializeApp);
