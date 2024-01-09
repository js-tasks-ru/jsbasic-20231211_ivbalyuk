function hideSelf() {
  let hiddenButton = document.querySelector(".hide-self-button");
  hiddenButton.addEventListener("click", (event) => {
    event.target.hidden = true;
  });
}
