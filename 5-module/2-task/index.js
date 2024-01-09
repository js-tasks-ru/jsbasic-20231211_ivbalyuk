function toggleText() {
  let toggleButton = document.querySelector(".toggle-text-button");
  let hiddenDiv = document.querySelector("#text");
  toggleButton.addEventListener("click", () => {
    hiddenDiv.hidden = !hiddenDiv.hidden;
  });
}
