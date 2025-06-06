const board = document.getElementById("board");
const status = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "〇";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      let get_cell = document.getElementById("board").getElementsByTagName("div");
      for(let i = 0;i < 3;i++){
        get_cell[combo[i]].className = "cell win";
      }
      status.textContent = `${gameBoard[a]} の勝ち！`;
      gameActive = false;
      return;
    }
  }

  if (!gameBoard.includes("")) {
    status.textContent = "引き分けです。";
    gameActive = false;
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameBoard[index] && gameActive) {
    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.className = currentPlayer === "〇" ? "cell maru" : "cell batu";
    checkWinner();
    currentPlayer = currentPlayer === "〇" ? "×" : "〇";
    if (gameActive) {
      status.textContent = `${currentPlayer} の番です`;
    }
  }
}

function renderBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.textContent = gameBoard[i];
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  }
  status.textContent = `${currentPlayer} の番です`;
}

function restartGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "〇";
  gameActive = true;
  renderBoard();
}

restartButton.addEventListener("click", restartGame);

// 初期描画
renderBoard();