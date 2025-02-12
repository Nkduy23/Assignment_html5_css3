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

const renderProduct = (product, container = null) => {
  if (!product) {
    console.error("Product is undefined or null.");
    return;
  }

  const productHTML = createProductHTML(product);

  if (container) {
    container.insertAdjacentHTML("beforeend", productHTML);
  } else if (product.category) {
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

const renderSaleProduct = (product, container) => {
  renderProduct(product, container);
};

const renderRegularProductByCategory = (product) => {
  renderProduct(product);
};

export { renderSaleProduct, renderRegularProductByCategory };
