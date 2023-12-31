let currentProblemData;
let questionCount = 0;
let correctCount = 0;
let wrongCount = 0;

// Function to generate a random math problem
function generateMathProblem() {
    const operations = ['+', '-', '*', '/'];
    const randomOperation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2;

    if (randomOperation === '+') {
        num1 = Math.floor(Math.random() * 90) + 10; // One or two-digit numbers
        num2 = Math.floor(Math.random() * 90) + 10;
    } else if (randomOperation === '-') {
        num1 = Math.max(Math.floor(Math.random() * 90) + 10, Math.floor(Math.random() * 90) + 10); // Ensure the greater number is on the left
        num2 = Math.min(Math.floor(Math.random() * 90) + 10, Math.floor(Math.random() * 90) + 10); // Ensure the smaller number is on the right
    } else if (randomOperation === '*') {
        num1 = Math.floor(Math.random() * 90) + 10; // One or two-digit numbers
        num2 = Math.floor(Math.random() * 9) + 1; // One-digit number
    } else if (randomOperation === '/') {
        num2 = Math.floor(Math.random() * 9) + 1; // One-digit number
        num1 = Math.floor(Math.random() * 90) + 10; // Dividend is never a three-digit number
        num1 = num1 - (num1 % num2); // Ensure division results in a whole number
    }

    const problemText = `${num1} ${randomOperation} ${num2}`;
    return {
        problem: problemText,
        answer: eval(problemText).toFixed(2), // Evaluate the expression and round to 2 decimal places
    };
}

// Function to display a new problem
function displayNewProblem() {
    questionCount++;
    const problemElement = document.getElementById('problem');
    currentProblemData = generateMathProblem();
    problemElement.textContent = currentProblemData.problem;
    document.getElementById('answer').value = ''; // Clear the text box
    updateCounter();
    clearInputBorders();
}

// Function to clear the input border
function clearInputBorders() {
    const inputContainer = document.querySelector('.input-container');
    inputContainer.classList.remove('correct', 'wrong');
}

// Event listener for the "Next" button
document.getElementById('generate').addEventListener('click', displayNewProblem);

// Event listener for the "Check" button
document.getElementById('check').addEventListener('click', function () {
    const userAnswer = parseFloat(document.getElementById('answer').value);
    const inputContainer = document.querySelector('.input-container');

    clearInputBorders(); // Clear any previous border

    if (isNaN(userAnswer)) {
        inputContainer.classList.add('wrong');
    } else {
        if (userAnswer === parseFloat(currentProblemData.answer)) {
            inputContainer.classList.add('correct');
            correctCount++;
        } else {
            inputContainer.classList.add('wrong');
            wrongCount++;
        }
        updateCounter();
    }
});

// Function to update the counter
function updateCounter() {
    const counterElement = document.getElementById('counter');
    counterElement.textContent = `Correct: ${correctCount}, Wrong: ${wrongCount}`;
}

// Initialize with the first problem
displayNewProblem();