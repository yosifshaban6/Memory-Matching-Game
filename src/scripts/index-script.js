
const popup =   document.getElementById("popup")
const easyButton =   document.getElementById("easy-button")
const mediumButton =   document.getElementById("medium-button")
const hardButton =   document.getElementById("hard-button")
const difficultyToggle =   document.getElementById("difficulty-toggle")
const difficultiesForm = document.getElementById("difficulties-form")
const input = document.querySelector("[name=difficulty]")

function showPopup() {
  popup.style.display = "flex";
}
function hidePopup() {
  popup.style.display = "none";
}

easyButton.addEventListener("mouseenter",()=>{
  difficultyToggle.style.backgroundSize = "203%";
})

mediumButton.addEventListener("mouseenter",()=>{
  difficultyToggle.style.backgroundSize = "136%";
})

hardButton.addEventListener("mouseenter",()=>{
  difficultyToggle.style.backgroundSize = "100%";
})

difficultiesForm.addEventListener("mouseenter",()=>{
  difficultyToggle.style.transition = "background-size 0.3s ease";
})

difficultiesForm.addEventListener("mouseleave",()=>{
  difficultyToggle.style.backgroundSize = "410%"
  difficultyToggle.style.transition = "background-size 0.3s ease";

})


difficultiesForm.addEventListener("submit",(e)=>{
  input.value = e.submitter.id 
  
})