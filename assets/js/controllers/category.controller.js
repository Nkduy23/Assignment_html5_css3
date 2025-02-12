import { getCategoryProducts } from "../models/product.model.js";
import { renderSaleProduct, renderRegularProductByCategory } from "../views/product-render.view.js";
import { addColorChangeEventListeners } from "../views/product-color.view.js";
import { updateProductProgress } from "../views/product-progress.view.js";

console.log("Product Category Controller Loaded");

export const CATEGORY_CONFIG = {
  sale: {
    containerId: "sale-category",
    renderFunction: (product, container) => renderSaleProduct(product, container),
  },
  shoesForWomen: {
    containerId: "shoes-for-women",
    renderFunction: (product, container) => renderRegularProductByCategory(product, container),
  },
  bags: {
    containerId: "bags",
    renderFunction: (product, container) => renderRegularProductByCategory(product, container),
  },
  shoesForMen: {
    containerId: "shoes-for-men",
    renderFunction: (product, container) => renderRegularProductByCategory(product, container),
  },
  DepSandal: {
    containerId: "dep-sandal",
    renderFunction: (product, container) => renderRegularProductByCategory(product, container),
  },
};

// Hàm lấy cấu hình danh mục (với fallback)
const getCategoryConfig = (category) =>
  CATEGORY_CONFIG[category] || {
    containerId: "default-container",
    renderFunction: null,
  };

// Hàm render sản phẩm
const renderProducts = (products, category, container, renderFunction) => {
  if (!products || !products[`${category}Products`]) {
    console.warn(`No products found for category "${category}".`);
    return;
  }

  products[`${category}Products`].forEach((product) => renderFunction(product, container));
  console.log(`Rendered ${products[`${category}Products`].length} products for category "${category}".`);
};

export const loadDataByCategory = async (category) => {
  const { containerId, renderFunction } = getCategoryConfig(category);

  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error(`Container element for category "${category}" not found!`);
    return;
  }

  try {
    const products = await getCategoryProducts(category);
    if (products && renderFunction) {
      renderProducts(products, category, container, renderFunction);

      // Gắn sự kiện sau khi render
      addColorChangeEventListeners();
      updateProductProgress();
    }
  } catch (error) {
    console.error("Error fetching category data:", error);
  }
};