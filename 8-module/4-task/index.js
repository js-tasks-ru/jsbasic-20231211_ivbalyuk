import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    if (!product) {
      return;
    }

    const count = 1;
    let cartItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );
    if (cartItem) {
      cartItem.count += count;
    } else {
      cartItem = { product, count };
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    const cartItem = this.cartItems.find(
      (item) => item.product.id === productId
    );
    cartItem.count += amount;
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.count !== 0);
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let totalCount = 0;
    this.cartItems.forEach((cartItem) => (totalCount += cartItem.count));
    return totalCount;
  }

  getTotalPrice() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let totalPrice = 0;
    this.cartItems.forEach(
      (cartItem) => (totalPrice += cartItem.count * cartItem.product.price)
    );
    return totalPrice;
  }

  renderProduct({ product, count }) {
    return createElement(`
    <div class="cart-product" data-product-id=
    "${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">
              €${this.getTotalPrice().toFixed(2)}
            </span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // ...ваш код
    this.modal = new Modal();
    this.modalBody = createElement("<div></div>");
    for (let cartItem of this.cartItems) {
      this.modalBody.append(this.renderProduct(cartItem));
    }
    this.modalBody.append(this.renderOrderForm());
    this.modal.setBody(this.modalBody);
    this.modal.setTitle("Your order");
    this.modal.open();

    this.modalBody.addEventListener("click", (event) => {
      let cartCounterButton = event.target.closest(".cart-counter__button");

      if (!cartCounterButton) {
        return;
      }

      this.cartProductId =
        cartCounterButton.closest(".cart-product").dataset.productId;

      if (event.target.closest(".cart-counter__button_minus")) {
        this.updateProductCount(this.cartProductId, -1);
      } else if (event.target.closest(".cart-counter__button_plus")) {
        this.updateProductCount(this.cartProductId, 1);
      }
    });

    document.querySelector(".cart-form").addEventListener("submit", (event) => {
      event.preventDefault();
      this.onSubmit(event);
    });
  }

  onProductUpdate(cartItem) {
    let modalBody = document.querySelector(".modal");

    if (document.querySelector("body").classList.contains("is-modal-open")) {
      let productId = cartItem.product.id;
      let productCount = document.querySelector(
        `[data-product-id="${productId}"] .cart-counter__count`
      );
      let productPrice = modalBody.querySelector(
        `[data-product-id="${productId}"] .cart-product__price`
      );
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(
        cartItem.product.price * cartItem.count
      ).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      if (cartItem.count == 0) {
        modalBody.querySelector(`[data-product-id="${productId}"]`).remove();
      }
    }

    this.cartIcon.update(this);
    if (this.cartItems.length == 0) {
      this.modal.close();
    }
  }

  onSubmit(event) {
    document.querySelector('[type="submit"]').classList.add("is-loading");
    const cartForm = document.querySelector(".cart-form");
   
    fetch("https://httpbin.org/post", {
      method: "POST",
      body: new FormData(cartForm)
    })
    .then((response) => {
      if (response.ok) {
        this.modal.setTitle("Success!");
        this.cartItems = [];
        this.modal.setBody(
          createElement(`
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>
        `)
        );
      }
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
