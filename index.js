const display = document.getElementById("input-result");
const calculator = document.getElementById("calculator");

let previousNumber = 0;
let currentNumber = 0;
let currentOperation = null;
let isNewInput = false;
const MAX_LENGTH = 9;

document.addEventListener("DOMContentLoaded", registerListener);

function registerListener() {
    calculator.addEventListener("click", calculatorLogic);    
}

const calculatorLogic = (e) => {
    const number = e.target.dataset.number;
    const operation = e.target.dataset.operation;
    const action = e.target.dataset.action;
   
    if(display.value === "Good try") reset();
    
    if (number) {
        if (isNewInput) {
            display.value = '';  
            isNewInput = false;
        }

        if(number === "." && display.value.includes("."))return;
        if(display.value.length < MAX_LENGTH) display.value += number; 
    }

    if (operation) handleOperation(operation);
    
    if (action) action === "clear"? reset() : display.value = display.value.slice(0, -1);
    
}

const handleOperation = (operation) => {
    if (currentOperation && !isNewInput) {
        currentNumber = parseFloat(display.value); 
        calculate();
    }

    previousNumber = parseFloat(display.value);  
    currentOperation = operation;
    isNewInput = true;
}

const calculate = () => {
    switch (currentOperation) {
        case "add":
            previousNumber += currentNumber;
            break;
        case "subtract":
            previousNumber -= currentNumber;
            break;
        case "multiply":
            previousNumber *= currentNumber;
            break;
        case "divide":
            if (currentNumber === 0) {
                display.value = "Good try"
                return;
            }
            
            previousNumber /= currentNumber;
            break;

        default:
            return;
    }
    
    if(previousNumber.toString().length > MAX_LENGTH){
        previousNumber = parseFloat(previousNumber.toString().slice(0, MAX_LENGTH));
    }
    display.value = previousNumber;
    currentOperation = null;  
    currentNumber = 0;  
}

const reset = () => {
    previousNumber = 0;
    currentNumber = 0;
    currentOperation = null;
    isNewInput = false;
    display.value = "";
}
