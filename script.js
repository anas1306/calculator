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
    Array.from(display.textContent).forEach(e => {
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
        if (display.textContent.length < 12) {
            if (digits.includes(parseInt(btn.textContent))) {
                if (display.textContent === "0") {
                    display.textContent = btn.textContent;
                } else {
                    display.textContent += btn.textContent;
                }
            } else if (btn.textContent === "." && checkForDot(display.textContent) == true && display.textContent != 0) {
                display.textContent += btn.textContent;
            } else if (
                symbols.includes(btn.textContent) &&
                active == 0 &&
                display.textContent != 0
            ) {
                display.textContent += btn.textContent;
                active = 1;
            } else if (
                active == 1 && 
                symbols.includes(btn.textContent) == true &&
                symbols.includes(display.textContent.charAt(display.textContent.length - 1)) == false
            ) {
                display.textContent = operate(display.textContent);
                display.textContent += btn.textContent;
            }
        }
        
        if (
            btn.textContent === "DEL" && 
            display.textContent != 0 
        ) {
            if (symbols.includes(display.textContent.charAt(display.textContent.length - 1))) {
            active = 0;
            }
            display.textContent = display.textContent.slice(0, -1);
        } else if (btn.textContent === "AC") {
            display.textContent = "0";
            active = 0;
        } else if (btn.textContent === "=") {
            if (
                symbols.includes(display.textContent.charAt(display.textContent.length - 1)) || 
                display.textContent.charAt(display.textContent.length - 1) === "."
        ) {
            } else {
                display.textContent = operate(display.textContent);
                active = 0;
            }
        }
    });
});
