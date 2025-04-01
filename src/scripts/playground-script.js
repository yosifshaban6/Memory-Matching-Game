const gameGrid = document.getElementById("game-grid");
const resetButton = document.getElementById("reset-btn");
const pauseButton = document.getElementById("pause-btn");
const gameTimer = document.getElementById("timer");
const moves = document.getElementById("moves");

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
  "🎈",
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

//Remove the two cards
function removeCards(...arrOfCards) {
  for (let card of arrOfCards) {
    card.style.visibility = "hidden";
  }
}

function moveCounter() {
  var movesCount = parseInt(moves.innerText);
  moves.innerText = String(`${String(++movesCount).padStart(2, "0")}`);
}

let firstFlipCard = undefined;
let secondFlipCard = undefined;
//Handle the card flip logic
function handleCardFlip(selectedCard) {
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

    // If the two cards match
    if (isMatching(firstFlipCard, secondFlipCard)) {
      // Remove the two cards from the game
      setTimeout(() => {
        flipBack(firstFlipCard);
        flipBack(secondFlipCard);
        removeCards(firstFlipCard, secondFlipCard);
        firstFlipCard = undefined;
        secondFlipCard = undefined;
      }, 1000);
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

    gameTimer.innerText = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
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
  startTimer();

  // Get the difficulty level from the URL parameters
  var params = new URLSearchParams(window.location.search);
  var difficulty = params.get("difficulty");

  switch (difficulty) {
    case "easy-button":
      // Set the grid to have 4 columns and Append 16 (4x4) cards
      cards = createCards(4);
      break;
    case "medium-button":
      // Set the grid to have 6 columns and Append 36 (6x6) cards
      cards = createCards(6);
      break;
    case "hard-button":
      // Set the grid to have 8 columns and Append 64 (8x8) cards
      cards = createCards(8);
      break;
    default:
      console.log("Unexpected difficulty level");
  }

  // Add event listeners to all cards
  for (let card of gameGrid.getElementsByClassName("game-card")) {
    card.addEventListener("click", () => {
      handleCardFlip(card);
    });
  }
}

function resetGame() {
  let firstFlipCard = undefined;
  let secondFlipCard = undefined;
  gameGrid.innerHTML = "";
  elapsedSeconds = 0;
  gameTimer.innerText = "00:00";
  moves.innerText = "00";

  pauseTimer();
  startGame();
}

resetButton.addEventListener("click", resetGame);
pauseButton.addEventListener("click", pauseTimer);
startGame();
