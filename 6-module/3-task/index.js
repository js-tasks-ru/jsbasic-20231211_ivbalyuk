import createElement from "../../assets/lib/create-element.js";
//import slides from './slides.js';
export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = createElement(`
      <div class="carousel"> 
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
      </div>`);

    this.createCarousel();
    this.addArrowListener();
    this.addToBacket();
  }
  
  createCarousel() {
    for (let slide of this.slides) {
      const element = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}"
            class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${slide.price.toFixed(2)}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
        </div>`);

      this.elem.querySelector(".carousel__inner").append(element);
    }
  }
  
  addArrowListener() {
    const carouselInner = this.elem.querySelector(".carousel__inner");
    let clickCount = 0;
    this.elem.querySelector(".carousel__arrow_left").style.display = "none";
    this.elem.addEventListener("click", (event) => {
      const carouselArrow = event.target.closest(".carousel__arrow");
      if (!carouselArrow) {
        return;
      }

      if (carouselArrow.classList.contains("carousel__arrow_right")) {
        clickCount++;
      } else if (carouselArrow.classList.contains("carousel__arrow_left")) {
        clickCount--;
      }

      carouselInner.style.transform = `translateX(-${
        carouselInner.offsetWidth * clickCount
      }px)`;
      this.elem.querySelector(".carousel__arrow_left").style.display =
        clickCount > 0 ? "" : "none";
      this.elem.querySelector(".carousel__arrow_right").style.display =
        clickCount === this.slides.length - 1 ? "none" : "";
    });
  }

  addToBacket() {
    this.elem.addEventListener("click", (event) => {
      if (event.target.classList.contains("carousel__button")) {
        const id = event.target.closest(".carousel__slide").dataset.id;
        let productAdd = new CustomEvent("product-add", {
          detail: id,
          bubbles: true,
        });
        this.elem.dispatchEvent(productAdd);
      }
    });
  }
}
