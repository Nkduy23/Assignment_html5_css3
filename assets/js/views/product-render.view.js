import { createProductHTML } from "../helpers/product.template.js";

const getCategoryContainer = (category) => {
  const categoryMap = {
    shoesForWomen: document.querySelector("#shoes-for-women .category-list"),
    bags: document.querySelector("#bags .category-list"),
    shoesForMen: document.querySelector("#shoes-for-men .category-list"),
    DepSandal: document.querySelector("#dep-sandal .category-list"),
  };
  return categoryMap[category] || null;
};

// Hàm render sản phẩm
const renderProduct = (product, container = null) => {
  if (!product) {
    console.error("Product is undefined or null.");
    return;
  }

  const productHTML = createProductHTML(product);

  if (container) {
    // Render vào container được truyền
    container.insertAdjacentHTML("beforeend", productHTML);
  } else if (product.category) {
    // Tự động tìm container theo danh mục sản phẩm
    const categoryContainer = getCategoryContainer(product.category);
    if (categoryContainer) {
      categoryContainer.insertAdjacentHTML("beforeend", productHTML);
    } else {
      console.error(`No container found for category: ${product.category}`);
    }
  } else {
    console.error("Container is undefined, and product has no category.");
  }
};

// Hàm render sản phẩm Sale
const renderSaleProduct = (product, container) => {
  renderProduct(product, container);
};

// Hàm render sản phẩm Regular
const renderRegularProductByCategory = (product) => {
  renderProduct(product);
};

export { renderSaleProduct, renderRegularProductByCategory };
