const gameGrid = document.getElementById("game-grid");

for (let card of gameGrid.getElementsByClassName("game-card")) {
  card.addEventListener("click", () => {
    flip(card);
  });
}

function flip(card) {
  card.style.transform = "rotateY(180deg)";
}
