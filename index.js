const display = document.getElementById("input-result");
const calculator = document.getElementById("calculator");

let previousNumber = 0;
let nextNumber = 0;
let setOperation = null;
let isNextNumber = false;


document.addEventListener("DOMContentLoaded", registerListener);

function registerListener(){
    calculator.addEventListener("click", calculatorLogic);    
}

const calculatorLogic = (e)=>{

    const number = e.target.dataset.number;
    const operation = e.target.dataset.operation;
    const action = e.target.dataset.action;

   
    if(number){
        display.value += number;
    }

    if(operation){
        setOperation =operation;
     
        if(previousNumber && nextNumber){
            calculate;
        }
       
    }

    if(action){
        if(action === "clear"){
           reset();
        }
        else if(action === "delete"){
            display.value = display.value.slice(0,-1);
        }
    }

   
}

const calculate = ()=>{

    switch(setOperation){
        case "add":
        previousNumber = sum();
        break;

        case "subtract":
        previousNumber = sum();
        break;

        case "multiply":
        previousNumber = sum();
        break;

        case "divide":
        previousNumber = sum();
        break;

        case "result":
        calculate();
        break;

        default:
        return;
    }

    display.value = previousNumber;
   
}

const sum = () => previousNumber + nextNumber;
const subtract = ()=> previousNumber - nextNumber;
const multiply = ()=> previousNumber * nextNumber;
const divide = ()=>{
    if(nextNumber === 0){
        return;
    }else{
        return previousNumber / nextNumber;
    }
}

const reset = ()=>{
    previousNumber = 0;
    nextNumber = 0;
    display.value = "";
}