function popupContact () {
  let arrButton = document.querySelectorAll(".popup-contact");
  
  for (let i = 0; i < arrButton.length; i++ ) {
  
    let parentDiv = arrButton[i].parentNode

    let newButton = document.createElement("button");

    newButton.innerHTML = arrButton[i].innerHTML;

    let aarClasslist = arrButton[i].classList;

    for (let i = 0; i < aarClasslist.length; i++) {
      newButton.classList.add(aarClasslist[i]);
    }
    
    parentDiv.replaceChild(newButton, arrButton[i]);
    
    newButton.addEventListener("click", function () {
      document.querySelector(".contact").classList.add("popup");
    })
  }

  document.addEventListener("click", function (e) {

    e = e || event;

    if(e.target == document.querySelector(".contact") || e.target == document.querySelector(".close-popup")) {
      document.querySelector(".contact").classList.remove("popup");
    }
  })
}