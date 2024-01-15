import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.createMenu();
    this.createCategories();
    this.addScrollListener();
    this.selectСategories();
  }

  createMenu() {
    this.elem = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">   
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);
  }

  createCategories() {
    for (let category of this.categories) {
      const element = createElement(`
        <a href="#" class="ribbon__item" data-id="${category.id}">
          ${category.name}
        </a>
      `);
      
      this.elem.querySelector(".ribbon__inner").append(element);
    }
  }

  addScrollListener() {
    const ribbonInner = this.elem.querySelector(".ribbon__inner");
    const ribbonArrowLeft = this.elem.querySelector(".ribbon__arrow_left");
    const ribbonArrowRight = this.elem.querySelector(".ribbon__arrow_right");
    ribbonArrowLeft.classList.remove("ribbon__arrow_visible");
    this.elem.addEventListener("click", (event) => {
      const ribbonArrow = event.target.closest(".ribbon__arrow");
      if (!ribbonArrow) {
        return;
      }
      
      if (ribbonArrow.classList.contains("ribbon__arrow_left")) {
        ribbonInner.scrollBy(-350, 0);
      } else if (ribbonArrow.classList.contains("ribbon__arrow_right")) {
        ribbonInner.scrollBy(350, 0);
      }
    });

    ribbonInner.addEventListener("scroll", () => {
      const scrollLeft = ribbonInner.scrollLeft;
      const scrollWidth = ribbonInner.scrollWidth;
      const clientWidth = ribbonInner.clientWidth;
      const scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft == 0) {
        ribbonArrowLeft.classList.remove("ribbon__arrow_visible");
      } else {
        ribbonArrowLeft.classList.add("ribbon__arrow_visible");
      }

      if (scrollRight < 1) {
        ribbonArrowRight.classList.remove("ribbon__arrow_visible");
      } else {
        ribbonArrowRight.classList.add("ribbon__arrow_visible");
      }
    });
  }

  selectСategories() {
    this.elem.addEventListener("click", (event) => {
      event.preventDefault();
      const ribbonItem = event.target;
      if (!ribbonItem) {
        return;
      }
      
      if (event.target.classList.contains("ribbon__item")) {
        const beforeActiveItem = this.elem.querySelector('.ribbon__item_active');
        if (beforeActiveItem) {
          beforeActiveItem.classList.remove('ribbon__item_active');
        }
        
        ribbonItem.classList.add("ribbon__item_active");
        const id = event.target.closest(".ribbon__item").dataset.id;
        const selectCategory = new CustomEvent("ribbon-select", {
          detail: id,
          bubbles: true,
        });
        
        this.elem.dispatchEvent(selectCategory);
      }
    });
  }
}