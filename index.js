const display = document.getElementById("input-result");
const calculator = document.getElementById("calculator");

let firstOperand = 0;
let secondOperand = 0;
let currentOperation = null;
let isNewNumber = false;
let isFirstCalculation = true;

const MAX_LENGTH = 9;
const ERROR_MESSAGE = "Good try!";

document.addEventListener("DOMContentLoaded", registerListener);
function registerListener() {
    calculator.addEventListener("click", calculatorLogic);    
}


const calculatorLogic = (e) => {
    const number = e.target.dataset?.number;
    const operation = e.target.dataset?.operation;
    const action = e.target.dataset?.action;
    
    if (number) {
        display.value === ERROR_MESSAGE && reset();
        isFirstCalculation = false;
        if (isNewNumber) {
            display.value = '';  
            isNewNumber = false;
        }
       
        if(number === "." && display.value.includes("."))return;
        if(display.value.length < MAX_LENGTH) display.value += number; 
    }

    if (operation && display.value !== ERROR_MESSAGE){
        !isFirstCalculation && handleOperation(operation);       
    } 
    
    if (action){

        if(action === "clear") reset();
        else if(action === "delete" && display.value.length > 0){
           display.value =  display.value.slice(0, -1);
           display.value.length <= 0 && reset();   
        }
    } 
}

const handleOperation = (operation) => {
   
    if (currentOperation && !isNewNumber) {
        secondOperand = parseFloat(display.value); 
        calculate();
    }

    firstOperand = parseFloat(display.value);  
    currentOperation = operation;
    isNewNumber = true;
}

const calculate = () => {
    switch (currentOperation) {
        case "add":
            firstOperand += secondOperand;
            break;
        case "subtract":
            firstOperand -= secondOperand;
            break;
        case "multiply":
            firstOperand *= secondOperand;
            break;
        case "divide":
            if (secondOperand === 0) {
                display.value = ERROR_MESSAGE;
                return;
            }
            
            firstOperand /= secondOperand;
            break;

        default:
            return;
    }
    if(firstOperand.toString().includes(".")){
        firstOperand= firstOperand.toString().split(".")[1].length > 2? firstOperand.toFixed(2) : firstOperand;
    }
   
    display.value = firstOperand;
    currentOperation = null;  
    secondOperand = 0;  
}

const reset = () => {
    firstOperand = 0;
    secondOperand = 0;
    currentOperation = null;
    isNewNumber = false;
    display.value = "";
    isFirstCalculation = true;
}
