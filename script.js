let total = 0;
let isNegative = false;
let currentValue = "";
let currentFunc = null;

document.querySelectorAll(".number").forEach(e => e.addEventListener("click", numberClickEvent))
document.querySelectorAll(".operator").forEach(e => e.addEventListener("click", operatorClickEvent))

function updateDisplay(toAppend) {
    const inputDisplay = document.getElementById("input-display");
    console.log(inputDisplay.id)
    inputDisplay.innerText += toAppend;
}

function numberClickEvent(event) {
    currentValue += event.target.innerText;
    updateDisplay(currentValue);
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
                updateDisplay(" + ");
            }
            break;
        case "-":
            if(currentValue.length == 0 && !isNegative) {
                isNegative = true;
                updateDisplay("-");
            }
            else {
                currentFunc = (a, b) => a - b;
                total = currentValue;
                updateDisplay(" - ");
            }
            break;
    }
    logdetails();
}

function calculate() {
    total = currentFunc(total, currentValue);
    currentValue = "";
    currentFunc = null;
    logdetails();
}

function logdetails() {
    console.log(`total: ${total}`)
    console.log(`currentValue: ${currentValue}`)
    console.log(`currentFunc: ${currentFunc}`)
}

