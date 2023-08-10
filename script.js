let total = 0;
let currentValue = "";
let currentFunc = null;
let isNegative = false;
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
    switch(event.target.innerText) {
        case "+":
            if(currentValue.length != 0 && !currentFunc) {
                currentFunc = (a, b) => a + b;
                total = currentValue;
                currentValue = "";
                inputDisplay.innerText += (" +");
            }
            break;
        case "-":
            if(currentValue.length == 0 && !isNegative)
                isNegative = true;
            
            else {
                currentFunc = (a, b) => a - b;
                total = currentValue;
                currentValue = "";
            }

            inputDisplay.innerText += (" -");
            break;
        case "*":
            if(currentValue.length != 0 && !currentFunc) {
                currentFunc = (a, b) => a * b;
                total = currentValue;
                currentValue = "";
                inputDisplay.innerText += (" x");
            }
            break;
    }
    logdetails();
}

function equalsClickEvent() {
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

function calculate() {
   
}

function clearValues() {
    total = 0;
    currentValue = "";
    currentFunc = null;
    inputDisplay.innerText = "";
    logdetails();
}

function logdetails() {
    console.log("------------------------")
    console.log(`total: ${total} (${typeof total})`)
    console.log(`currentValue: ${currentValue} (${typeof currentValue})`)
    console.log(`currentFunc: ${currentFunc}`)
}

