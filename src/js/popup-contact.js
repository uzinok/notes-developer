function popupContact () {
  let arrButton = document.querySelectorAll(".popup-contact");
  
  for (let i = 0; i < arrButton.length; i++ ) {
  
    let parentDiv = arrButton[i].parentNode

    let newButton = document.createElement("button");

    newButton.innerHTML = arrButton[i].innerHTML;

    newButton.classList = arrButton[i].classList;

    parentDiv.replaceChild(newButton, arrButton[i]);
    
    newButton.addEventListener("click", function () {
      document.querySelector(".contact").classList.add("popup");
    })
  }
}