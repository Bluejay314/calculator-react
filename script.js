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
            // If 'currentValue' is empty, the number is flagged as negative
            if(currentValue.length == 0) {
                inputDisplay.innerText += " " + event.target.innerText;
                currentValue += event.target.innerText;
            }
            else
                setFunc((a, b) => a - b, operator); break;

        case "*": setFunc((a, b) => a * b, operator); break;
        case "/": setFunc((a, b) => a / b, operator); break;
    }

    function setFunc(func, symbol) {
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
    if(willError) {
        clearValues();
        inputDisplay.innerText = "ERROR";
    }
    if(isNegative)
        total = operation(total, (parseFloat(currentValue) * -1));
    else
        total = operation(total, parseFloat(currentValue));

    if(typeof total == 'number' && !Number.isInteger(total))
        total = total.toFixed(2);

    currentValue = "";
    operation = null;

    inputDisplay.innerText = total;
}

function clearValues() {
    total = 0;
    currentValue = "";
    operation = null;
    inputDisplay.innerText = "";
    willError = false;
}

function logdetails() {
    console.log("------------------------")
    console.log(`total: ${total} (${typeof total})`)
    console.log(`currentValue: ${currentValue} (${typeof currentValue})`)
    console.log(`currentFunc: ${operation}`)
    console.log(`willError: ${willError}`);
}

