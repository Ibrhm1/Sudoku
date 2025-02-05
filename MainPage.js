var numSelected = null;
var tileSelected = null;

var errors = 0;

var board = [
  "--74916-5",
  "2---6-3-9",
  "-----7-1-",
  "-586----4",
  "--3----9-",
  "--62--187",
  "9-4-7---2",
  "67-83----",
  "81--45---",
];

var solution = [
  "387491625",
  "241568379",
  "569327418",
  "758619234",
  "123784596",
  "496253187",
  "934176852",
  "675832941",
  "812945763",
];

window.onload = function () {
  setGame();
};

function setGame() {
  // Digits 1-9
  for (let i = 1; i <= 9; i++) {
    let number = document.createElement("div");
    number.id = i;
    number.innerText = i;
    number.addEventListener("click", selectNumber);
    number.classList.add("number");
    document.getElementById("digits").appendChild(number);
  }

  // Board 9x9
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      if (board[r][c] != "-") {
        tile.innerText = board[r][c];
        tile.classList.add("tile-start");
      }
      if (r == 2 || r == 5) {
        tile.classList.add("horizontal-line");
      }
      if (c == 2 || c == 5) {
        tile.classList.add("vertical-line");
      }
      tile.addEventListener("click", selectTile);
      tile.classList.add("tile");
      document.getElementById("board").append(tile);
    }
  }
}

function selectNumber() {
  if (numSelected != null) {
    numSelected.classList.remove("number-selected");
  }
  numSelected = this;
  numSelected.classList.add("number-selected");
}

function selectTile() {
  if (numSelected) {
    if (this.innerText != "") {
      return;
    }

    let coords = this.id.split("-"); // ["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (solution[r][c] == numSelected.id) {
      this.innerText = numSelected.id;

      // Cek permainan sudah selesai
      if (checkWin()) {
        gameOver(true); // Pemain menang
      }
    } else {
      errors += 1;
      document.getElementById("number-errors").innerText = errors;

      // Jika kesalahan mencapai 5, permainan selesai
      if (errors >= 5) {
        gameOver(false); // Pemain kalah
      }
    }
  }
}

function checkWin() {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      if (tile.innerText != solution[r][c]) {
        return false; // Jika ada satu ubin yang tidak sesuai, permainan belum selesai
      }
    }
  }
  return true;
}

function resetGame() {
  const gameOverMessage = document.getElementById("game-over");
  if (gameOverMessage) {
    gameOverMessage.remove();
  }

  errors = 0;
  document.getElementById("number-errors").innerText = errors;

  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) => {
    if (!tile.classList.contains("tile-start")) {
      tile.innerText = "";
    }
  });

  if (numSelected) {
    numSelected.classList.remove("number-selected");
    numSelected = null;
  }
}

function gameOver(isWin) {
  const gameOverMessage = document.createElement("div");
  gameOverMessage.id = "game-over";
  if (isWin) {
    gameOverMessage.innerHTML = `
      <div class="game-over-overlay">
        <h1 class="text-game-header">Selamat!</h1>
        <h1>Yeayyyy, kamu menang</h1>
        <button onclick="resetGame()">Main Lagi</button>
      </div>
    `;
  } else {
    gameOverMessage.innerHTML = `
      <div class="game-over-overlay">
        <h1 class="text-game-header">Game Over!</h1>
        <h1>Yahhh, kamu udh buat 5 kesalahan. Ayo coba lagi!</h1>
        <button onclick="resetGame()">Coba Lagi</button>
      </div>
    `;
  }
  document.body.appendChild(gameOverMessage);

  setTimeout(() => {
    gameOverMessage.classList.add("show");
  }, 100);
}
