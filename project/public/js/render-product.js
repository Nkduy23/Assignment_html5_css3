import { createProductHTML } from './create-product-html.js';

// Hàm render sản phẩm Sale
function renderSaleProduct(product, container) {
  const productHTML = createProductHTML(product);
  container.insertAdjacentHTML("beforeend", productHTML);
}

// Hàm render sản phẩm Regular
function renderRegularProductByCategory(product) {
  // Xác định phần tử container cho từng category
  const categories = {
    shoesForWomen: document.querySelector("#shoes-for-women .category-list"),
    balo: document.querySelector("#balo .category-list"),
    shoesForMen: document.querySelector("#shoes-for-men .category-list"),
    DepSandal: document.querySelector("#sandal .category-list"),
  };

  // Kiểm tra nếu category của sản phẩm tồn tại trong đối tượng categories
  if (categories[product.category]) {
    const categoryListContainer = categories[product.category];
    const productHTML = createProductHTML(product);
    //Thêm sản phẩm vào cuối danh sách trong container tương ứng.
    categoryListContainer.insertAdjacentHTML("beforeend", productHTML);
  }
}


export { renderSaleProduct, renderRegularProductByCategory };
