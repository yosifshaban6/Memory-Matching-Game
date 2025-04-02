const popupContainer = document.getElementById("popup-container");
const easyButton = document.getElementById("easy-button");
const mediumButton = document.getElementById("medium-button");
const hardButton = document.getElementById("hard-button");
const difficultyToggle = document.getElementById("difficulty-toggle");
const difficultiesForm = document.getElementById("difficulties-form");
const input = document.querySelector("[name=difficulty]");

function showPopup() {
  popupContainer.style.display = "flex";
}
function hidePopup() {
  popupContainer.style.display = "none";
}

difficultiesForm.addEventListener("submit", (e) => {
  input.value = e.submitter.id;
});

popupContainer.addEventListener("click", (e) => {
  if (e.target === popupContainer) {
    hidePopup();
  }
});
