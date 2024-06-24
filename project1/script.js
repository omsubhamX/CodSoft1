const display = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('button');

let displayValue = '0';
let firstOperand = null;
let waitingForSecondOperand = false;
let operator = null;

function updateDisplay() {
    display.value = displayValue;
}

updateDisplay();

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
                handleOperator(value);
                break;
            case '=':
                handleEqualSign();
                break;
            case 'all-clear':
                resetCalculator();
                break;
            case 'delete':
                deleteLastDigit();
                break;
            case '.':
                inputDecimal(value);
                break;
            default:
                inputDigit(value);
                break;
        }

        updateDisplay();
    });
});

function inputDigit(digit) {
    if (waitingForSecondOperand) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal(dot) {
    if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
}

function deleteLastDigit() {
    displayValue = displayValue.slice(0, -1);
    if (displayValue === '') {
        displayValue = '0';
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand == null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);
        displayValue = String(result);
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

function handleEqualSign() {
    const inputValue = parseFloat(displayValue);

    if (firstOperand == null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);
        displayValue = String(result);
        firstOperand = null;
        operator = null;
    }

    waitingForSecondOperand = false;
}

const performCalculation = {
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '%': (firstOperand, secondOperand) => firstOperand % secondOperand,
};

function resetCalculator() {
    displayValue = '0';
    firstOperand = null;
    waitingForSecondOperand = false;
    operator = null;
}
