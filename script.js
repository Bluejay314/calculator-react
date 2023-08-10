let total = 0;
let currentValue = "";
let currentFunc = null;
let isNegative = false;
let willError = false;
const inputDisplay = document.getElementById("input-display");

document.querySelectorAll(".number").forEach(e => e.addEventListener("click", numberClickEvent))
document.querySelectorAll(".operator").forEach(e => e.addEventListener("click", operatorClickEvent))
document.querySelector("#equals").addEventListener("click", equalsClickEvent);
document.querySelector("#clear").addEventListener("click", clearValues);

function numberClickEvent(event) {
    inputDisplay.innerText += " " + event.target.innerText;
    currentValue += event.target.innerText;
    logdetails();
}

function operatorClickEvent(event) {
    let operator = event.target.innerText;
    switch(event.target.innerText) {
        case "+": setFunc((a, b) => a + b, operator); break;
        case "-":
            if(currentValue.length == 0 && !isNegative)
                isNegative = true;
            
            setFunc((a, b) => a - b, operator); break;

        case "*": setFunc((a, b) => a * b, operator); break;
        case "/": setFunc((a, b) => a / b, operator); break;
    }
    logdetails();

    function setFunc(func, symbol) {
        if(currentValue.length != 0 && !currentFunc) {
            currentFunc = func;
            total = currentValue;
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
        total = currentFunc(parseFloat(total), (parseFloat(currentValue) * -1));
    else
        total = currentFunc(parseFloat(total), parseFloat(currentValue));

    if(typeof total == 'number' && !Number.isInteger(total))
        total = total.toFixed(2);

    currentValue = "";
    currentFunc = null;

    inputDisplay.innerText = total;
    logdetails();
}

function clearValues() {
    total = 0;
    currentValue = "";
    currentFunc = null;
    inputDisplay.innerText = "";
    willError = false;
    logdetails();
}

function logdetails() {
    console.log("------------------------")
    console.log(`total: ${total} (${typeof total})`)
    console.log(`currentValue: ${currentValue} (${typeof currentValue})`)
    console.log(`currentFunc: ${currentFunc}`)
    console.log(`willError: ${willError}`);
}

