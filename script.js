let total = 0;          // Value entered before operator
let currentValue = "";  // The current numerical input from user
let operation = null;   // Function to be applied on 'total' and 'currentValue'
let isNegative = false; // True if number currently entered will be negative
let willError = false;  // True if user input cannot be parsed, and ERROR will print

const inputDisplay = document.getElementById("input-display");

document.querySelectorAll(".number").forEach(e => e.addEventListener("click", numberClickEvent))
document.querySelectorAll(".operator").forEach(e => e.addEventListener("click", operatorClickEvent))
document.querySelector("#equals").addEventListener("click", equalsClickEvent);
document.querySelector("#clear").addEventListener("click", clearValues);

/*
  Called when the user clicks on a numerical button. Adds to the
  'currentValue' string that later is parsed as a number.
*/
function numberClickEvent(event) {
    inputDisplay.innerText += " " + event.target.innerText;
    currentValue += event.target.innerText;
}

/*
  Called when the user inputs clicks on an operation button. Resets
  'currentValue' and moves it into total. Stores the function that
  will be called on 'total' and 'currentValue' later.
*/
function operatorClickEvent(event) {
    // Symbol displayed on in display is the same as displayed by HTML
    let operator = event.target.innerText;
    switch(event.target.innerText) {
        case "+": setFunc((a, b) => a + b, operator); break;
        case "-":
            // If 'currentValue' is empty, the number is negative
            if(currentValue.length == 0) {
                inputDisplay.innerText += " " + event.target.innerText;
                currentValue += event.target.innerText;
            }
            else
                setFunc((a, b) => a - b, operator); break;

        case "*": setFunc((a, b) => a * b, operator); break;
        case "/": setFunc((a, b) => a / b, operator); break;
    }

    // Utility function to avoid repetative code
    function setFunc(func, symbol) {
        // set operator if we have a value to operate on and no operator has already been set.
        if(currentValue.length != 0 && !operation) {
            operation = func;
            total = parseFloat(currentValue);
            currentValue = "";
        }
        else  
            willError = true;

        inputDisplay.innerText += (" " + symbol);
    }
}

function equalsClickEvent() {
    // An error will be displayed instead of evaluating the input
    if(willError) {
        clearValues();
        inputDisplay.innerText = "ERROR";
    }
    else {
        // Parse 'currentValue' into a Number and perform the stored operation
        total = operation(total, parseFloat(currentValue));

        // If the resulting number is a float, round to two decimal places
        if(typeof total == 'number' && !Number.isInteger(total))
            total = total.toFixed(2);

        currentValue = "";
        operation = null;

        inputDisplay.innerText = clearValues();
    }
}

/*
  Resets all data to start again. Returns the current total if required.
*/
function clearValues() {
    let toReturn = total;
    total = 0;
    currentValue = "";
    operation = null;
    inputDisplay.innerText = "";
    willError = false;
    return toReturn;
}
