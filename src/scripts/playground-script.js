const params = new URLSearchParams(window.location.search);
const difficulty = params.get("difficulty");
const gameGrid = document.getElementById("game-grid")
console.log(difficulty)

switch (difficulty) {
    case "easy-button":
        // Set the grid to have 4 columns
        gameGrid.style.gridTemplateColumns = "repeat(4, 1fr)";
        // Add 16 (4x4) game cards 
        for (let i=0; i<16; i++){
            gameGrid.innerHTML += `
        <div class="game-card-inner">
            <div class="game-card-front">
                <img src="../public/images/iti-logo.svg" alt="1" />
            </div>
            <div class="game-card-back">
                <img src="../public/images/star-2.ico" alt="1" />
            </div>
        </div>
      `
        }
    

      break;
    case "medium-button":
              // Set the grid to have 6 columns
              gameGrid.style.gridTemplateColumns = "repeat(6, 1fr)";
              // Add 36 (6x6) game cards 
              for (let i=0; i<36; i++){
                  gameGrid.innerHTML += `
              <div class="game-card-inner">
                  <div class="game-card-front">
                      <img src="../public/images/iti-logo.svg" alt="1" />
                  </div>
                  <div class="game-card-back">
                      <img src="../public/images/star-2.ico" alt="1" />
                  </div>
              </div>
            `
              }
      break;
    case "hard-button":
              // Set the grid to have 6 columns
              gameGrid.style.gridTemplateColumns = "repeat(8, 1fr)";
              // Add 64 (8x8) game cards 
              for (let i=0; i<64; i++){
                  gameGrid.innerHTML += `
              <div class="game-card-inner">
                  <div class="game-card-front">
                      <img src="../public/images/iti-logo.svg" alt="1" />
                  </div>
                  <div class="game-card-back">
                      <img src="../public/images/star-2.ico" alt="1" />
                  </div>
              </div>
            `
              }
      break;
    default:
      console.log("Unexpected difficulty level");
  }