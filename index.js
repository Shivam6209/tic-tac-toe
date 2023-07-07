const statusDisplay = document.querySelector('.game-over-text');
const currentPlayerName=document.querySelector(".current-player");

let isActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game draw please restart!`;
const currentPlayerTurn = () => `Its ${currentPlayer}'s turn`;

currentPlayerName.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add('cell-clicked');
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentPlayerName.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if (a === b && b === c && a!="" && b!="" && c!="") {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        currentPlayerName.style.display="none";
        statusDisplay.style.display="block";
        statusDisplay.innerHTML = winningMessage();
        isActive = false;
        return;
    }

    const roundDraw = !gameState.includes("");
    if (roundDraw) {
        currentPlayerName.style.display="none";
        statusDisplay.style.display="block";
        statusDisplay.innerHTML = drawMessage();
        isActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-value'));

    if (gameState[clickedCellIndex] !== "" || !isActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function restartGame() {
    isActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayerName.style.display="block"
    currentPlayerName.innerHTML = currentPlayerTurn();
    statusDisplay.style.display="none";
    document.querySelectorAll('.grid-cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.grid-cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('#btn').addEventListener('click', restartGame);
