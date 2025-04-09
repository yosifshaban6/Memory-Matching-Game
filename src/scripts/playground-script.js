const gameGrid = document.getElementById("game-grid");
const resetButton = document.getElementById("reset-btn");
const pauseButton = document.getElementById("pause-btn");
const gameTimer = document.getElementById("timer");
const moves = document.getElementById("moves");
const params = new URLSearchParams(window.location.search);
const difficulty = params.get("difficulty");
const gridSize = (function (difficulty) {
  switch (difficulty) {
    case "easy-button":
      return 4;
    case "medium-button":
      return 6;
    case "hard-button":
      return 8;
    default:
      console.log("Invalid difficulty level. Defaulting to easy.");
      return 4; // Default to easy if no valid difficulty is provided
  }
})(difficulty);

let emojis = [
  "💐",
  "🌹",
  "🌻",
  "🏵️",
  "🌺",
  "🌴",
  "🌈",
  "🍓",
  "🍒",
  "🍎",
  "🍉",
  "🍊",
  "🍍",
  "🍋",
  "🍏",
  "🍐",
  "🥝",
  "🍇",
  "🥥",
  "🍅",
  "🌶️",
  "🍄",
  "🥦",
  "🥑",
  "🍔",
  "🍕",
  "🎂",
  "🍬",
  "🍩",
  "🍫",
  "🎈",
  "🌿",
];

// flip the card
function flip(card) {
  card.style.transform = "rotateY(180deg)";
}

// flip the card back
function flipBack(card) {
  card.style.transform = "rotateY(0deg)";
}

//Check if back images are the same for two selected cards
function isMatching(firstCard, secondCard) {
  return firstCard.id === secondCard.id;
}

function moveCounter() {
  var movesCount = parseInt(moves.innerText);
  moves.innerText = String(`${String(++movesCount).padStart(2, "0")}`);
}

let firstFlipCard = undefined;
let secondFlipCard = undefined;
let numberOfMatches = 0;
//Handle the card flip logic
function handleCardFlip(event) {
  selectedCard = event.currentTarget;
  // If a second card is flipped or the first card is clicked again
  if (paused || secondFlipCard || selectedCard === firstFlipCard) {
    //do nothing
  }
  // If a first card is flipped
  else if (firstFlipCard) {
    // If same card is clicked again
    if (firstFlipCard === selectedCard) {
      //do nothing
    }
    //flip the second card
    secondFlipCard = selectedCard;
    flip(secondFlipCard);
    new Audio("../public/audio/flip.wav").play();

    // If the two cards match
    if (isMatching(firstFlipCard, secondFlipCard)) {
      numberOfMatches++;
      firstFlipCard.removeEventListener("click", handleCardFlip);
      secondFlipCard.removeEventListener("click", handleCardFlip);
      firstFlipCard = undefined;
      secondFlipCard = undefined;
      // Check if all cards are matched
      if (numberOfMatches === (gridSize * gridSize) / 2) {
        clearInterval(timerInterval);
        setTimeout(() => {
          new Audio("../public/audio/win.wav").play();
          // Show the win message
          document.writeln("winner winner!👏 chicken dinner!🐥");
        }, 720);
        numberOfMatches;
      }
    } else {
      moveCounter();
      // Wait 1 second before flipping both cards back
      setTimeout(() => {
        flipBack(firstFlipCard);
        flipBack(secondFlipCard);
        firstFlipCard = undefined;
        secondFlipCard = undefined;
      }, 900);
    }
  }
  // If neither
  else {
    // Flip the first card
    firstFlipCard = selectedCard;
    flip(firstFlipCard);
    new Audio("../public/audio/flip.wav").play();
  }
}

// Customizes the grid and appends cards given the grid size
function createCards(gridSize) {
  // define corresponding size of the card
  let cardSize = (function () {
    if (gridSize === 4) {
      return "large-card";
    } else if (gridSize === 6) {
      return "medium-card";
    } else if (gridSize === 8) {
      return "small-card";
    }
  })();
  // Define grid size
  gameGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  // Define set of imojis to be used according to the grid size
  var gameEmojis = emojis.sort(() => Math.random() - 0.5); // Shuffle the emojis
  gameEmojis = gameEmojis.slice(0, (gridSize * gridSize) / 2); // Select half of the emojis
  gameEmojis = [...gameEmojis, ...gameEmojis]; // Duplicate the emojis
  gameEmojis = gameEmojis.sort(() => Math.random() - 0.5); // Shuffle the emojis to ensure pairs are not necessarily on different half of cards
  // Append cards to the grid
  for (let i = 0; i < gridSize * gridSize; i++) {
    imoji = gameEmojis.pop();

    gameGrid.innerHTML += `
        <div class="game-card ${cardSize}" id="${imoji}">
          <div class="game-card-front">
            <img src="../public/images/iti-logo.svg" alt="1" />
          </div>
          <div class="game-card-back">
            ${imoji}
          </div>
        </div>
  `;
  }
}

var timerInterval;
var elapsedSeconds = 0;
function startTimer() {
  clearInterval(timerInterval);

  timerInterval = setInterval(function () {
    elapsedSeconds++;
    var minutes = Math.floor(elapsedSeconds / 60);
    var remainingSeconds = Math.floor(elapsedSeconds % 60);

    gameTimer.innerText = `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }, 1000);
}

var paused = false;
function pauseTimer() {
  clearInterval(timerInterval);
  paused = !paused;
  if (paused) {
    pauseButton.innerText = "Resume";
  } else {
    pauseButton.innerText = "Pause";
    startTimer();
  }
}

function startGame() {
  createCards(gridSize);
  startTimer();
  // Add event listeners to all cards
  for (let card of gameGrid.getElementsByClassName("game-card")) {
    card.addEventListener("click", handleCardFlip);
  }
}

function resetGame() {
  let firstFlipCard = undefined;
  let secondFlipCard = undefined;
  gameGrid.innerHTML = "";
  elapsedSeconds = 0;
  gameTimer.innerText = "00:00";
  moves.innerText = "00";
  if (paused) {
    pauseTimer();
  }

  startGame();
}

resetButton.addEventListener("click", resetGame);
pauseButton.addEventListener("click", pauseTimer);
startGame();
