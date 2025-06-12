const buttons = document.querySelectorAll(".numperator")
const display = document.querySelector(".screen")
const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."]
const symbols =  ["+", "-", "×", "÷"]
let active = 0
let integerActive = 0

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (display.textContent.length < 12) {
            if (digits.includes(parseInt(btn.textContent))) {
                if (display.textContent === "0") {
                    display.textContent = btn.textContent;
                } else {
                    display.textContent += btn.textContent;
                }
            } else if (btn.textContent === "." && integerActive === 0 && display.textContent != 0) {
                display.textContent += btn.textContent;
                integerActive = 1;
            } else if (
                symbols.includes(btn.textContent) &&
                active == 0
            ) {
                display.textContent += btn.textContent;
                active = 1;
                integerActive = 0;
            }
        }
        
        if (btn.textContent === "DEL") {
            if (symbols.includes(display.textContent.charAt(display.textContent.length - 1))) {
            active = 0;
            }
            display.textContent = display.textContent.slice(0, -1);
        } else if (btn.textContent === "AC") {
            display.textContent = "0";
            active = 0;
            integerActive = 0;
        }
    });
});