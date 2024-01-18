import createElement from "../../assets/lib/create-element.js";
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.createSlide();
    this.addSlideListener();
  }

  createSlide() {
    this.elem = createElement(`
       <!--Корневой элемент слайдера-->
        <div class="slider">
        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>
        <!--Полоска слайдера-->
        <div class="slider__progress"></div>
        <!-- Шаги слайдера (вертикальные чёрточки) -->
        <div class="slider__steps">
        </div>
      </div>
   `);
   
    const sliderSteps = this.elem.querySelector(".slider__steps");
    for (let step = 0; step < this.steps; step++) {
      if (step == 0) {
        sliderSteps.insertAdjacentHTML("beforeend", `<span class="slider__step-active"></span>`);
      } else {
        sliderSteps.insertAdjacentHTML("beforeend", `<span></span>`);
      }
    }
  }

  
  addSlideListener() {
    this.elem.addEventListener("click", (event) => {
      this.selectionStep(event);
      this.addActiveStep();
      const sliderChange = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      });
      this.elem.dispatchEvent(sliderChange);
    });
  }

  selectionStep(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    this.value = Math.round(approximateValue);
    this.valuePercents = (this.value / segments) * 100;
    const sliderValue = this.elem.querySelector(".slider__value");
    sliderValue.textContent = this.value;

    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");
    thumb.style.left = `${this.valuePercents}%`;
    progress.style.width = `${this.valuePercents}%`;
  }

  addActiveStep() {
    const sliderSteps = this.elem.querySelector(".slider__steps");
    const spans = sliderSteps.querySelectorAll("span");
    const spanActive = document.querySelector(".slider__step-active");
    if (spanActive) {
      spanActive.classList.remove("slider__step-active");
    }
    spans[this.value].classList.add("slider__step-active");
  }
  
}
