import { createProductHTML } from './create-product-html.js';

// Hàm render sản phẩm Sale
function renderSaleProduct(product) {
  const saleContainer = document.getElementById("flash-sale-products");
  const productHTML = createProductHTML(product);
  saleContainer.insertAdjacentHTML("beforeend", productHTML);
}

// Hàm render sản phẩm Regular
function renderRegularProduct(product) {
  const regularContainer = document.getElementById("regular-products");
  const productHTML = createProductHTML(product);
  regularContainer.insertAdjacentHTML("beforeend", productHTML);
}

export { renderSaleProduct, renderRegularProduct };
