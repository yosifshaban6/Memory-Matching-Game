const params = new URLSearchParams(window.location.search);
const difficulty = params.get("difficulty");
const gameGrid = document.getElementById("game-grid")



// Customizes the grid and appends cards given number of cards
// Each card is a div with class name = "game-card-inner"
// Each card has onclick action corresponding to its order in the grid
// Retruns HTML collection of the cards
function createCards(numOfCards){
    gameGrid.style.gridTemplateColumns = `repeat(${numOfCards}, 1fr)`;
    for (let i=0; i<numOfCards*numOfCards; i++){
        gameGrid.innerHTML += `
    <div class="game-card-inner" onclick = flip(${i}) >
        <div class="game-card-front">
            <img src="../public/images/iti-logo.svg"  />
        </div>
        <div class="game-card-back">
            <img src="../public/images/star-2.ico" />
        </div>
    </div>
  `
    }

    return gameGrid.getElementsByClassName("game-card-inner"); 

}


var firstFlipCard = undefined
var secondFlipCard = undefined
//flips the selected card given its order  
function flip(cardOrder) {
    selectedCard = cards[cardOrder];

    // If a second card is flipped, do nothing
    if (secondFlipCard) {    
    }
    // If a first card is flipped, flip the second card
    else if (firstFlipCard) {
        secondFlipCard = selectedCard
        secondFlipCard.style.transform = "rotateY(180deg)";

        // Wait 1 second before flipping both cards back
        setTimeout(() => {
            firstFlipCard.style.transform = "rotateY(0)";
            secondFlipCard.style.transform = "rotateY(0)";
            firstFlipCard = undefined;
            secondFlipCard = undefined
        }, 1000);  
    } 
    // If neither, flip the first card
    else {
        firstFlipCard = selectedCard;
        firstFlipCard.style.transform = "rotateY(180deg)";
    }
}



switch (difficulty) {
    case "easy-button":
        // Set the grid to have 4 columns and Append 16 (4x4) cards 
        cards = createCards(4)
      break;
    case "medium-button":
        // Set the grid to have 6 columns and Append 36 (6x6) cards 
        cards = createCards(6)
      break;
    case "hard-button":
        // Set the grid to have 8 columns and Append 64 (8x8) cards 
        cards = createCards(8)
      break;
    default:
      console.log("Unexpected difficulty level");
  }




