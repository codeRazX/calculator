const display = document.getElementById("input-result");
const calculator = document.getElementById("calculator");

let previousNumber = 0;
let currentNumber = 0;
let currentOperation = null;
let isNewInput = false;

document.addEventListener("DOMContentLoaded", registerListener);

function registerListener() {
    calculator.addEventListener("click", calculatorLogic);    
}

const calculatorLogic = (e) => {
    const number = e.target.dataset.number;
    const operation = e.target.dataset.operation;
    const action = e.target.dataset.action;

    if(display.value === "Good try"){
        display.value = "";
    }
    // Si presionamos un número
    if (number) {
        if (isNewInput) {
            display.value = '';  // Limpiar la pantalla si es un nuevo número
            isNewInput = false;
        }
        display.value += number; // Agregar el número al display
    }

    // Si presionamos una operación
    if (operation) {
        handleOperation(operation);
    }

    // Si presionamos una acción (limpiar o borrar)
    if (action) {
        if (action === "clear") {
            reset();
        } else if (action === "delete") {
            display.value = display.value.slice(0, -1); // Borrar el último caracter
        }
    }
}

const handleOperation = (operation) => {
    if (currentOperation && !isNewInput) {
        currentNumber = parseFloat(display.value);  // Guardar el número actual
        calculate();
    }

    previousNumber = parseFloat(display.value);  // Guardar el número anterior
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
                reset();
                return;
            }
            previousNumber /= currentNumber;
            break;
        default:
            return;
    }
    
    display.value = previousNumber;
    currentOperation = null;  // Resetear la operación después de calcular
    currentNumber = 0;  // Resetear el número actual
}

const reset = () => {
    previousNumber = 0;
    currentNumber = 0;
    currentOperation = null;
    isNewInput = false;
}
