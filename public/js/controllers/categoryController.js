import { renderSaleProduct, renderRegularProductByCategory } from "../views/productRenderView.js";
import { addColorChangeEventListeners } from "../views/productColorEventView.js";
import { updateProductProgress } from "../views/progressProductView.js";

console.log("Product Category Controller Loaded");

// Phát hiện môi trường dựa trên URL
const isGitHubPages = window.location.hostname === "nkduy23.github.io";
const baseUrl = isGitHubPages ? `${window.location.origin}/Assignment_html5_css3` : window.location.origin;
// Cấu hình dữ liệu danh mục
export const CATEGORY_CONFIG = {
  sale: {
    jsonFile: `${baseUrl}/data/products-sale.json`,
    containerId: "sale-category",
    renderFunction: (product, container) => renderSaleProduct(product, container),
  },
  shoesForWomen: {
    jsonFile: `${baseUrl}/data/products-regular.json`,
    containerId: "shoes-for-women",
    renderFunction: (product, container) => renderRegularProductByCategory(product, container),
  },
  balo: {
    jsonFile: `${baseUrl}/data/products-category1.json`,
    containerId: "balo",
    renderFunction: (product, container) => renderRegularProductByCategory(product, container),
  },
  shoesForMen: {
    jsonFile: `${baseUrl}/data/products-category2.json`,
    containerId: "shoes-for-men",
    renderFunction: (product, container) => renderRegularProductByCategory(product, container),
  },
  DepSandal: {
    jsonFile: `${baseUrl}/data/products-category3.json`,
    containerId: "dep-sandal",
    renderFunction: (product, container) => renderRegularProductByCategory(product, container),
  },
};

// Hàm lấy cấu hình danh mục (với fallback)
const getCategoryConfig = (category) =>
  CATEGORY_CONFIG[category] || {
    jsonFile: `${baseUrl}/data/products-main.json`,
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
  }
  fetchCategoryData;

  const products = await fetchCategoryData(jsonFile);
  if (products && renderFunction) {
    renderProducts(products, category, container, renderFunction);

    // Gắn sự kiện sau khi render
    addColorChangeEventListeners();
    updateProductProgress();
  }
};

export { loadDataByCategory };
