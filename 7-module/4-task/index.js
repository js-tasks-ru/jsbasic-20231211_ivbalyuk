import createElement from "../../assets/lib/create-element.js";
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.createSlide();
    this.progress = this.elem.querySelector(".slider__progress");
    this.thumb = this.elem.querySelector(".slider__thumb");
    this.addSlideListener();
    this.addPointerListener();
  }

  pointMoveHadler = (event) => this.selectionStepPointerMove(event);

  pointUpHadler = (event) => {
    this.createCustomEvent();
    document.removeEventListener("pointermove", this.pointMoveHadler);
    document.removeEventListener("pointerup", this.pointUpHadler);
    this.elem.classList.remove("slider_dragging");
  }

  createSlide() {
    this.elem = createElement(`
        <div class="slider">
          <div class="slider__thumb">
            <span class="slider__value">0</span>
          </div>
          <div class="slider__progress"></div>
          <div class="slider__steps"></div>
      </div>
   `);

    const sliderSteps = this.elem.querySelector(".slider__steps");
    for (let step = 0; step < this.steps; step++) {
      if (step == 0) {
        sliderSteps.insertAdjacentHTML(
          "beforeend",
          `<span class="slider__step-active"></span>`
        );
      } else {
        sliderSteps.insertAdjacentHTML("beforeend", `<span></span>`);
      }
    }
  }

  addSlideListener() {
    this.elem.addEventListener("click", (event) => {
      this.selectionStepClick(event);
      this.addActiveStep();
      this.createCustomEvent();
    });
  }

  selectionStepPointerMove(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    if (leftRelative < 0) {
      leftRelative = 0;
    }
    
    if (leftRelative > 1) {
      leftRelative = 1;
    }
    
    const leftPercents = leftRelative * 100;
    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;
    this.value = Math.round(approximateValue);
    const sliderValue = this.elem.querySelector(".slider__value");
    sliderValue.textContent = this.value;
    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;
  }

  selectionStepClick(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;
    this.value = Math.round(approximateValue);
    this.valuePercents = (this.value / segments) * 100;
    const sliderValue = this.elem.querySelector(".slider__value");
    sliderValue.textContent = this.value;
    this.thumb.style.left = `${this.valuePercents}%`;
    this.progress.style.width = `${this.valuePercents}%`;
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

  addPointerListener() {
    this.thumb.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      this.elem.classList.add("slider_dragging");
      document.addEventListener("pointermove", this.pointMoveHadler);
      document.addEventListener("pointerup", this.pointUpHadler);
      this.thumb.ondragstart = () => false;
    });
  }

  createCustomEvent() {
    const sliderChange = new CustomEvent("slider-change", { detail: this.value, bubbles: true });
    this.elem.dispatchEvent(sliderChange);
  }
}
