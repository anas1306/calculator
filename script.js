function checkForDot(toChecked) {
    let sepString = Array.from(toChecked);
    let dotIndex = sepString.indexOf(".");
    let symbolIndex = 0;
    sepString.forEach(e => {
        if (e === "+") {
            symbolIndex = sepString.indexOf("+");
        } else if (e === "-") {
            symbolIndex = sepString.indexOf("-");
        } else if (e === "×") {
            symbolIndex = sepString.indexOf("×");
        } else if (e === "÷") {
            symbolIndex = sepString.indexOf("÷");
        }
    });
    if (dotIndex === -1) {
        return true;
    } else if (dotIndex > symbolIndex) {
        return false;
    } else {
        return true;
    }
}

function operate(expression) {
    Array.from(display.value).forEach(e => {
        if (e === "+") {
            sepNumber = expression.split("+")
            result = parseFloat(sepNumber[0]) + parseFloat(sepNumber[1])
        } else if (e === "-") {
            sepNumber = expression.split("-")
            result = parseFloat(sepNumber[0]) - parseFloat(sepNumber[1])
        } else if (e === "×") {
            sepNumber = expression.split("×")
            result = parseFloat(sepNumber[0]) * parseFloat(sepNumber[1])
        } else if (e === "÷") {
            sepNumber = expression.split("÷")
            result = parseFloat(sepNumber[0]) / parseFloat(sepNumber[1])
        }
    });
    if (result === "NOPE") {
        return expression;
    } else if (result % 1 != 0) {
        roundedResult = result.toFixed(2)
        return roundedResult
    } else {
        return result
    }
}

const buttons = document.querySelectorAll(".numperator")
const display = document.querySelector(".screen")
const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."]
const symbols =  ["+", "-", "×", "÷"]
let active = 0
let symbol = 0
let result = "NOPE"

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (digits.includes(parseInt(btn.textContent))) {
            if (display.value === "0") {
                display.value = btn.textContent;
            } else {
                display.value += btn.textContent;
            }
        } else if (btn.textContent === "." && checkForDot(display.value) == true && display.value != 0) {
            display.value += btn.textContent;
        } else if (
            (display.value != 0 || btn.textContent == "-") &&
            symbols.includes(btn.textContent) &&
            active == 0 
        ) {
            if (display.value == "0") {
                display.value = btn.textContent;
            } else {
                display.value += btn.textContent;
                active = 1;
            }
        } else if (
            active == 1 && 
            symbols.includes(btn.textContent) == true &&
            symbols.includes(display.value.charAt(display.value.length - 1)) == false
        ) {
            display.value = operate(display.value);
            display.value += btn.textContent;
        }
        
        if (
            btn.textContent === "DEL" && 
            display.value != 0 
        ) {
            if (symbols.includes(display.value.charAt(display.value.length - 1))) {
            active = 0;
            }
            display.value = display.value.slice(0, -1);
        } else if (btn.textContent === "AC") {
            display.value = "0";
            active = 0;
        } else if (btn.textContent === "=") {
            if (
                symbols.includes(display.value.charAt(display.value.length - 1)) || 
                display.value.charAt(display.value.length - 1) === "."
        ) {
            } else {
                display.value = operate(display.value);
                active = 0;
            }
        }
    });
});
