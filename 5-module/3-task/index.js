function initCarousel() {
  const carousel = document.querySelector(".carousel");
  const carouselInner = carousel.querySelector(".carousel__inner");
  let clickCount = 0;
  carousel.querySelector(".carousel__arrow_left").style.display = "none";
  carousel.addEventListener("click", (event) => {
    const carouselArrow = event.target.closest(".carousel__arrow");
    if (!carouselArrow) {
      return;
    }

    if (carouselArrow.classList.contains("carousel__arrow_right")) {
      clickCount++;
    } else if (carouselArrow.classList.contains("carousel__arrow_left")) {
      clickCount--;
    }

    carouselInner.style.transform = `translateX(-${carouselInner.offsetWidth * clickCount}px)`;
    carousel.querySelector(".carousel__arrow_left").style.display = (clickCount > 0) ? "" : "none";
    carousel.querySelector(".carousel__arrow_right").style.display = (clickCount === 3) ? "none" : "";
  });
}
