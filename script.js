const calculatorDisplay = document.querySelector("#calculatorDisplay");
const calculatorButtons = document.querySelectorAll(".calculator-btn");

let currentInput = "";
let hasError = false;

function updateDisplay(value) {
    calculatorDisplay.textContent = value || "0";
}

function isOperator(character) {
    return ["+", "-", "*", "/"].includes(character);
}

function getCurrentNumber() {
    return currentInput.split(/[+\-*/]/).pop();
}

function clearCalculator() {
    currentInput = "";
    hasError = false;
    updateDisplay("0");
}

function deleteLastCharacter() {
    if (hasError) {
        clearCalculator();
        return;
    }

    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
}

function addToInput(value) {
    if (!value) {
        return;
    }

    if (hasError) {
        currentInput = "";
        hasError = false;
    }

    if (isOperator(value)) {
        addOperator(value);
        return;
    }

    if (value === ".") {
        addDecimal();
        return;
    }

    currentInput += value;
    updateDisplay(currentInput);
}

function addOperator(operatorValue) {
    const lastCharacter = currentInput.slice(-1);

    if (currentInput === "") {
        return;
    }

    if (isOperator(lastCharacter)) {
        currentInput = currentInput.slice(0, -1) + operatorValue;
    } else {
        currentInput += operatorValue;
    }

    updateDisplay(currentInput);
}

function addDecimal() {
    const currentNumber = getCurrentNumber();

    if (currentNumber.includes(".")) {
        return;
    }

    if (currentInput === "" || isOperator(currentInput.slice(-1))) {
        currentInput += "0.";
    } else {
        currentInput += ".";
    }

    updateDisplay(currentInput);
}

function tokenizeExpression(expression) {
    return expression.match(/\d+(\.\d+)?|[+\-*/]/g);
}

function handleMultiplyAndDivide(tokens) {
    const calculatedTokens = [...tokens];

    for (let index = 0; index < calculatedTokens.length; index++) {
        const operator = calculatedTokens[index];

        if (operator !== "*" && operator !== "/") {
            continue;
        }

        const leftNumber = Number(calculatedTokens[index - 1]);
        const rightNumber = Number(calculatedTokens[index + 1]);

        if (operator === "/" && rightNumber === 0) {
            return "divide-error";
        }

        const result = operator === "*"
            ? leftNumber * rightNumber
            : leftNumber / rightNumber;

        calculatedTokens.splice(index - 1, 3, result.toString());
        index = 0;
    }

    return calculatedTokens;
}

function handleAddAndSubtract(tokens) {
    let result = Number(tokens[0]);

    for (let index = 1; index < tokens.length; index += 2) {
        const operator = tokens[index];
        const nextNumber = Number(tokens[index + 1]);

        if (operator === "+") {
            result += nextNumber;
        }

        if (operator === "-") {
            result -= nextNumber;
        }
    }

    return result;
}

function formatResult(result) {
    if (Number.isInteger(result)) {
        return result.toString();
    }

    return Number(result.toFixed(8)).toString();
}

function showError(message) {
    hasError = true;
    updateDisplay(message);
}

function calculateResult() {
    if (currentInput === "") {
        showError("Enter a number");
        return;
    }

    if (isOperator(currentInput.slice(-1))) {
        showError("Invalid input");
        return;
    }

    const tokens = tokenizeExpression(currentInput);

    if (!tokens || tokens.join("") !== currentInput) {
        showError("Invalid input");
        return;
    }

    const multipliedTokens = handleMultiplyAndDivide(tokens);

    if (multipliedTokens === "divide-error") {
        showError("Can't divide by zero");
        return;
    }

    const finalResult = handleAddAndSubtract(multipliedTokens);

    if (!Number.isFinite(finalResult)) {
        showError("Invalid input");
        return;
    }

    currentInput = formatResult(finalResult);
    updateDisplay(currentInput);
}

function handleButtonInput(button) {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (action === "clear") {
        clearCalculator();
        return;
    }

    if (action === "delete") {
        deleteLastCharacter();
        return;
    }

    if (action === "equals") {
        calculateResult();
        return;
    }

    addToInput(value);
}

function handleKeyboardInput(event) {
    const allowedKeys = "0123456789+-*/.";

    if (allowedKeys.includes(event.key)) {
        event.preventDefault();
        addToInput(event.key);
    }

    if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        calculateResult();
    }

    if (event.key === "Backspace") {
        event.preventDefault();
        deleteLastCharacter();
    }

    if (event.key === "Escape") {
        clearCalculator();
    }
}

calculatorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        handleButtonInput(button);
    });
});

document.addEventListener("keydown", handleKeyboardInput);