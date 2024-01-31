export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    const count = 1;
    let cartItem = this.cartItems.find((item) => item.product.id === product.id);
    if (cartItem) {
      cartItem.count += count;
    } else {
      cartItem = { product, count };
      this.cartItems.push(cartItem);
    }
    
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    const cartItem = this.cartItems.find((item) => item.product.id === productId);
    cartItem.count += amount;
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.count !== 0);
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.forEach((cartItem) => (totalCount += cartItem.count));
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach((cartItem) => (totalPrice += cartItem.count * cartItem.product.price));
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}