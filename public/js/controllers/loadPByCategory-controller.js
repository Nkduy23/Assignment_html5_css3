import { renderSaleProduct, renderRegularProductByCategory } from "../views/product-renderer.js";
import { addColorChangeEventListeners } from "../views/product-color-events.js";
import { updateProductProgress } from "../views/progress-updater.js";

console.log("Product Category Controller Loaded");

// Cấu hình dữ liệu danh mục
const CATEGORY_CONFIG = {
  sale: {
    jsonFile: "/public/data/products-sale.json",
    containerId: "sale-category",
    renderFunction: (product, container) => renderSaleProduct(product, container),
  },
  regular: {
    jsonFile: "/public/data/products-regular.json",
    containerId: "shoes-for-women",
    renderFunction: (product, container) => renderRegularProductByCategory(product, container),
  },
  category1: {
    jsonFile: "/public/data/products-category1.json",
    containerId: "balo",
    renderFunction: (product, container) => renderRegularProductByCategory(product, container),
  },
  category2: {
    jsonFile: "/public/data/products-category2.json",
    containerId: "shoes-for-men",
    renderFunction: (product, container) => renderRegularProductByCategory(product, container),
  },
  category3: {
    jsonFile: "/public/data/products-category3.json",
    containerId: "dep-sandal",
    renderFunction: (product, container) => renderRegularProductByCategory(product, container),
  },
};

// Hàm lấy cấu hình danh mục (với fallback)
const getCategoryConfig = (category) => 
  CATEGORY_CONFIG[category] || {
    jsonFile: "/public/data/products-main.json",
    containerId: "default-container",
    renderFunction: null,
  };

// Hàm fetch dữ liệu từ JSON
const fetchCategoryData = async (jsonFile) => {
  try {
    const response = await fetch(jsonFile);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
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

// Hàm chính
const loadDataByCategory = async (category) => {
  const { jsonFile, containerId, renderFunction } = getCategoryConfig(category);

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container element for category "${category}" not found!`);
    return;
  }fetchCategoryData

  const products = await fetchCategoryData(jsonFile);
  if (products && renderFunction) {
    renderProducts(products, category, container, renderFunction);

    // Gắn sự kiện sau khi render
    addColorChangeEventListeners();
    updateProductProgress();
  }
};

export { loadDataByCategory };
