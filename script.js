const currentDisplay = document.getElementById("currentDisplay");
const previousDisplay = document.getElementById("previousDisplay");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const equalsButton = document.getElementById("equals");
const decimalButton = document.getElementById("decimal");

let currentNumber = "";
let previousNumber = "";
let operation = null;


// ================================
// UPDATE DISPLAY
// ================================

function updateDisplay() {

    currentDisplay.textContent =
        currentNumber || "0";

    if (previousNumber && operation) {

        previousDisplay.textContent =
            `${previousNumber} ${operation}`;

    } else {

        previousDisplay.textContent = "";
    }
}


// ================================
// NUMBERS
// ================================

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentNumber += button.textContent;

        updateDisplay();
    });

});


// ================================
// OPERATORS
// ================================

operatorButtons.forEach(button => {

    button.addEventListener("click", () => {

        setOperator(
            button.dataset.operation
        );

    });

});


// ================================
// SET OPERATOR
// ================================

function setOperator(selectedOperation) {

    if (currentNumber === "") {
        return;
    }

    if (previousNumber !== "") {

        calculate();
    }

    operation = selectedOperation;

    previousNumber = currentNumber;

    currentNumber = "";

    updateDisplay();
}


// ================================
// CALCULATE
// ================================

function calculate() {

    const previous =
        parseFloat(previousNumber);

    const current =
        parseFloat(currentNumber);


    if (
        isNaN(previous) ||
        isNaN(current)
    ) {
        return;
    }


    let result;


    switch (operation) {

        case "+":

            result =
                previous + current;

            break;


        case "-":

            result =
                previous - current;

            break;


        case "×":

            result =
                previous * current;

            break;


        case "÷":

            if (current === 0) {

                currentNumber = "Error";

                previousNumber = "";

                operation = null;

                updateDisplay();

                return;
            }

            result =
                previous / current;

            break;
    }


    currentNumber =
        Number(result.toFixed(10)).toString();

    previousNumber = "";

    operation = null;

    updateDisplay();
}


// ================================
// EQUALS
// ================================

equalsButton.addEventListener(
    "click",
    () => {

        if (
            previousNumber === "" ||
            currentNumber === "" ||
            !operation
        ) {
            return;
        }

        calculate();
    }
);


// ================================
// CLEAR
// ================================

clearButton.addEventListener(
    "click",
    () => {

        currentNumber = "";

        previousNumber = "";

        operation = null;

        updateDisplay();
    }
);


// ================================
// DELETE
// ================================

deleteButton.addEventListener(
    "click",
    () => {

        currentNumber =
            currentNumber.slice(0, -1);

        updateDisplay();
    }
);


// ================================
// DECIMAL
// ================================

decimalButton.addEventListener(
    "click",
    () => {

        if (
            currentNumber.includes(".")
        ) {
            return;
        }

        currentNumber += ".";

        updateDisplay();
    }
);


// ================================
// KEYBOARD
// ================================

document.addEventListener(
    "keydown",
    (event) => {

        const key = event.key;


        // Numbers

        if (
            key >= "0" &&
            key <= "9"
        ) {

            currentNumber += key;

            updateDisplay();
        }


        // Decimal

        else if (key === ".") {

            if (
                !currentNumber.includes(".")
            ) {

                currentNumber += ".";

                updateDisplay();
            }
        }


        // Addition

        else if (key === "+") {

            setOperator("+");
        }


        // Subtraction

        else if (key === "-") {

            setOperator("-");
        }


        // Multiplication

        else if (key === "*") {

            setOperator("×");
        }


        // Division

        else if (key === "/") {

            setOperator("÷");
        }


        // Enter

        else if (
            key === "Enter" ||
            key === "="
        ) {

            if (
                previousNumber &&
                currentNumber &&
                operation
            ) {

                calculate();
            }
        }


        // Backspace

        else if (key === "Backspace") {

            currentNumber =
                currentNumber.slice(0, -1);

            updateDisplay();
        }


        // Escape

        else if (key === "Escape") {

            currentNumber = "";

            previousNumber = "";

            operation = null;

            updateDisplay();
        }

    }
);


// Initial display

updateDisplay();
