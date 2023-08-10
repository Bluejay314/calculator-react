let total = 0;
let isNegative = false;
let currentValue = "";
let currentFunc = null;
const inputDisplay = document.getElementById("input-display");

document.querySelectorAll(".number").forEach(e => e.addEventListener("click", numberClickEvent))
document.querySelectorAll(".operator").forEach(e => e.addEventListener("click", operatorClickEvent))
document.querySelector("#equals").addEventListener("click", equalsClickEvent);
document.querySelector("#clear").addEventListener("click", clearValues);

function numberClickEvent(event) {
    // currentValue += event.target.innerText;
    // inputDisplay.innerText = currentValue;
    inputDisplay.innerText += " " + event.target.innerText;
    currentValue += event.target.innerText;
    logdetails();
}

function operatorClickEvent(event) {
    if(currentValue.length != 0 && total != 0)
        calculate();

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
            if(currentValue.length == 0 && !isNegative) {
                isNegative = true;
            }
            else {
                currentFunc = (a, b) => a - b;
                total = currentValue;
                currentValue = "";
            }

            inputDisplay.innerText += (" -");
            break;
    }
    logdetails();
}

function equalsClickEvent() {
    calculate();
    inputDisplay.innerText = total;
}

function calculate() {
    total = currentFunc(parseFloat(total), isNegative? parseFloat(currentValue) * -1 : parseFloat(currentValue));
    currentValue = "";
    currentFunc = null;
    logdetails();
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
    console.log(`total: ${total}`)
    console.log(`currentValue: ${currentValue}`)
    console.log(`currentFunc: ${currentFunc}`)
}

