const board = document.getElementById('board');
const cellElements = document.querySelectorAll('[data-cell]');
const playerOneScoreEl = document.getElementById('playerOneScore');
const playerTwoScoreEl = document.getElementById('playerTwoScore');

const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
let circleTurn = false;
let playerOneScore = '0';
let playerTwoScore = '0';

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        updateScore(false);
    } else if (isDraw()) {
        updateScore(true);
    } else {
        switchTurns();
        setBoardHoverClass();
    }
}

function updateScore(draw) {
    if (draw) {
        // alert('DRAW!');
    } else {
        if (circleTurn) {
            playerTwoScore++;
            playerTwoScoreEl.textContent = playerTwoScore;
        } else {
            playerOneScore++;
            playerOneScoreEl.textContent = playerOneScore;
        }
    }
    startGame();
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function switchTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}