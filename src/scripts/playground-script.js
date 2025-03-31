const gameGrid = document.getElementById("game-grid");
const params = new URLSearchParams(window.location.search);

const difficulty = params.get("difficulty");
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

let firstFlipCard = undefined;
let secondFlipCard = undefined;
//Handle the card flip logic
function handleCardFlip(selectedCard) {
  // If a second card is flipped or the first card is clicked again
  if (secondFlipCard || selectedCard === firstFlipCard) {
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
      // Wait 1 second before flipping both cards back
      setTimeout(() => {
        flipBack(firstFlipCard);
        flipBack(secondFlipCard);
        firstFlipCard = undefined;
        secondFlipCard = undefined;
      }, 1700);
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
  emojis = emojis.sort(() => Math.random() - 0.5); // Shuffle the emojis
  emojis = emojis.slice(0, (gridSize * gridSize) / 2); // Select half of the emojis
  emojis = [...emojis, ...emojis]; // Duplicate the emojis
  emojis = emojis.sort(() => Math.random() - 0.5); // Shuffle the emojis to ensure pairs are not necessarily on different half of cards
  // Append cards to the grid
  for (let i = 0; i < gridSize * gridSize; i++) {
    imoji = emojis.pop();

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

for (let card of gameGrid.getElementsByClassName("game-card")) {
  card.addEventListener("click", () => {
    handleCardFlip(card);
  });
}
