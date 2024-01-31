import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {
      noNuts: false,
      vegeterianOnly: false,
      maxSpiciness: 4,
      category: "",
    };

    this.createProductGrid();
    this.productsGridInner = this.elem.querySelector(".products-grid__inner");
    this.updateFilter(this.filters);
  }
  
  createProductGrid() {
    this.elem = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner">
      </div>
    </div>`);
  }

  createProductCards(products) {
    for (let product of products) {
      const productCard = new ProductCard(product);
      this.productsGridInner.append(productCard.elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    let products = this.products;
    if (this.filters.noNuts) {
      products = products.filter((product) => !product.nuts);
    }

    if (this.filters.vegeterianOnly) {
      products = products.filter((product) => product.vegeterian);
    }

    if (this.filters.maxSpiciness) {
      products = products.filter(
        (product) => product.spiciness <= this.filters.maxSpiciness
      );
    }

    if (this.filters.category) {
      products = products.filter(
        (product) => product.category === this.filters.category
      );
    }

    this.elem.querySelector(".products-grid__inner").innerHTML = "";
    this.createProductCards(products);
  }
}
