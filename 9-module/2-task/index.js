import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {
    this.renderComponents();
    this.communicationComponentsEvents();
  }

  async getData() {
    await fetch("products.json")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        this.productsGrid = new ProductsGrid(result);
        document.querySelector(`[data-products-grid-holder]`).innerHTML = "";
        document
          .querySelector(`[data-products-grid-holder]`)
          .append(this.productsGrid.elem);
      }).catch((e) => {
        document.querySelector(`[data-products-grid-holder]`).innerHTML = "Ошибка сервера";
      }); 
  }
  
  async render() {
    await this.getData();
    
    this.productsGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value,
    });
  }
  
  renderComponents() {
    this.carousel = new Carousel(slides);
    document.querySelector(`[data-carousel-holder]`).append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector(`[data-ribbon-holder]`).append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    document.querySelector(`[data-slider-holder]`).append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    document
      .querySelector(`[data-cart-icon-holder]`)
      .append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);
  }

  communicationComponentsEvents() {
    this.body = document.querySelector("body");
    this.body.addEventListener("product-add", (event) => {
      for (let product of this.productsGrid.products) {
        if (event.detail == product.id) {
          this.cart.addProduct(product);
        }
      }
    });

    this.slider = document.querySelector(".slider");
    this.slider.addEventListener("slider-change", (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail,
      });
    });

    this.ribbon = document.querySelector(".ribbon");
    this.ribbon.addEventListener("ribbon-select", (event) => {
      this.productsGrid.updateFilter({ category: event.detail });
    });

    document.querySelector("#nuts-checkbox").addEventListener(`change`, (event) => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked 
      });
    });

    document.querySelector("#vegeterian-checkbox").addEventListener(`change`, (event) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked 
      });
    });
  }
}
