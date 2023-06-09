function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
    return parseFloat(a) / parseFloat(b);
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return "ERROR"
    }
}

let num1 = "";
let num2 = "";
let operator = "";
let displayBottomField = document.querySelector('.calculator__display__bottom');
let displayTopField = document.querySelector('.calculator__display__top');

function updateBottomDisplay(string) {
    displayBottomField.innerText = string;
}

function updateTopDisplay(string) {
    displayTopField.innerText = string;
}

let numButtons = document.querySelectorAll(".calculator__btn--num");
numButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if (e.target.value == ".") {
            if (operator == "" && !(/[.]/.test(num1) && num1.length > 1)) {
                num1 = num1 + ".";
                updateBottomDisplay(num1);
            } else if (!(/[.]/.test(num2)) && num2.length > 1) {
                num2 = num2 + ".";
                updateBottomDisplay(num2);
            }
            return;
        }

        if (operator == "" && num1.length < 12) {
            num1 = num1 == "0" ? e.target.value : num1 + e.target.value;
            updateBottomDisplay(num1);
        } else if (num2.length < 12) {
            num2 = num2 == "0" ? e.target.value : num2 + e.target.value;
            updateBottomDisplay(num2);
        }

    });
});

let operatorButtons = document.querySelectorAll(".calculator__btn--operator");
operatorButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        // do nothing when the first number hasn't been enter yet
        if (num1 == "") {
            return;
        }
        
        if (operator == "" && num2 == "") {
            operator = e.target.value;
            updateTopDisplay(`${num1} ${e.target.value}`);
            updateBottomDisplay("");
        } else {
            if (checkZeroDivision() == true) {
                return;
            }
            num1 = operate(num1, num2, operator);
            num2 = ""
            operator = e.target.value;
            updateTopDisplay(`${num1} ${operator}`);
            updateBottomDisplay("");
        }

    });
});

let equalButton = document.querySelector(".calculator__btn--equal");
equalButton.addEventListener("click", () => {
    if (num2) {
        if (checkZeroDivision() == true) {
            return;
        }
        num1 = operate(num1, num2, operator);
        updateBottomDisplay(num1);
        updateTopDisplay("");
        num2 = ""
        operator = ""
    }
});

let clearButton = document.querySelector(".calculator__btn--clear");
clearButton.addEventListener("click", () => {
    updateBottomDisplay("");
    updateTopDisplay("");
    num1 = ""
    num2 = ""
    operator = ""
});

function checkZeroDivision(){
    if (num1 == "0" && operator == "/" && num2) {
        num1 = "";
        num2 = "";
        operator = "";
        updateTopDisplay("");
        updateBottomDisplay("ZERO DIVISION");
        return true;
    }
    return false;
}



