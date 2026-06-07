// Select display and all buttons
const calculatorDisplay = document.getElementById("calculatorDisplay");
const calculatorButtons = document.querySelectorAll(".calculator-btn");

let currentInput = "";
let hasError = false;

// Updates the calculator display
function updateDisplay(value) {
    calculatorDisplay.textContent = value || "0";
}

// Checks if a character is an operator
function isOperator(character) {
    return ["+", "-", "*", "/"].includes(character);
}

// Adds numbers, operators, and decimal points to the display
function addToInput(value) {
    if (hasError) {
        currentInput = "";
        hasError = false;
    }

    const lastCharacter = currentInput.slice(-1);

    if (isOperator(value) && (currentInput === "" || isOperator(lastCharacter))) {
        updateDisplay("Invalid input");
        hasError = true;
        return;
    }

    if (value === ".") {
        const parts = currentInput.split(/[+\-*/]/);
        const currentNumber = parts[parts.length - 1];

        if (currentNumber.includes(".")) {
            return;
        }
    }

    currentInput += value;
    updateDisplay(currentInput);
}

// Clears the whole calculator
function clearCalculator() {
    currentInput = "";
    hasError = false;
    updateDisplay("0");
}

// Deletes the last typed character
function deleteLastCharacter() {
    if (hasError) {
        clearCalculator();
        return;
    }

    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
}

// Splits the expression into numbers and operators
function tokenizeExpression(expression) {
    return expression.match(/\d+(\.\d+)?|[+\-*/]/g);
}

// Calculates multiplication and division first
function handleMultiplyAndDivide(tokens) {
    const newTokens = [...tokens];

    for (let index = 0; index < newTokens.length; index++) {
        const operator = newTokens[index];

        if (operator === "*" || operator === "/") {
            const leftNumber = Number(newTokens[index - 1]);
            const rightNumber = Number(newTokens[index + 1]);

            if (operator === "/" && rightNumber === 0) {
                return "divide-error";
            }

            const result = operator === "*"
                ? leftNumber * rightNumber
                : leftNumber / rightNumber;

            newTokens.splice(index - 1, 3, result.toString());
            index = 0;
        }
    }

    return newTokens;
}

// Calculates addition and subtraction after multiplication/division
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

// Formats long results to fit the display
function formatResult(result) {
    const resultText = result.toString();

    if (resultText.length > 10) {
        return Number(result.toFixed(8)).toString().slice(0, 10);
    }

    return resultText;
}

// Evaluates the full expression safely without eval()
function calculateResult() {
    if (currentInput === "") {
        updateDisplay("Enter a number");
        hasError = true;
        return;
    }

    if (isOperator(currentInput.slice(-1))) {
        updateDisplay("Invalid input");
        hasError = true;
        return;
    }

    const tokens = tokenizeExpression(currentInput);

    if (!tokens || tokens.join("") !== currentInput) {
        updateDisplay("Invalid input");
        hasError = true;
        return;
    }

    const multipliedTokens = handleMultiplyAndDivide(tokens);

    if (multipliedTokens === "divide-error") {
        updateDisplay("Can't divide by zero");
        hasError = true;
        return;
    }

    const finalResult = handleAddAndSubtract(multipliedTokens);

    if (!Number.isFinite(finalResult)) {
        updateDisplay("Invalid input");
        hasError = true;
        return;
    }

    currentInput = formatResult(finalResult);
    updateDisplay(currentInput);
}

// Handles all button clicks
calculatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
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
    });
});