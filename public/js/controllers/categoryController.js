import { renderSaleProduct, renderRegularProductByCategory } from "../views/productRenderView.js";
import { addColorChangeEventListeners } from "../views/productColorEventView.js";
import { updateProductProgress } from "../views/progressProductView.js";
import { fetchData } from "../utils/fetchData.js"; // Import fetchData
// import { basePath } from "../base.js";

const basePath = window.location.hostname === "nkduy23.github.io" 
  ? "/Assignment_html5_css3" 
  : "..";

console.log("Product Category Controller Loaded");

// Cấu hình dữ liệu danh mục
export const CATEGORY_CONFIG = {
  sale: {
    jsonFile: `${basePath}/data/productsSale.json`,  // Sử dụng basePath ở đây
    containerId: "sale-category",
    renderFunction: (product, container) => renderSaleProduct(product, container),
  },
  shoesForWomen: {
    jsonFile: `${basePath}/data/productsShoesForWomen.json`,
    containerId: "shoes-for-women",
    renderFunction: (product, container) => renderRegularProductByCategory(product, container),
  },
  balo: {
    jsonFile: `${basePath}/data/productsBalo.json`,
    containerId: "balo",
    renderFunction: (product, container) => renderRegularProductByCategory(product, container),
  },
  shoesForMen: {
    jsonFile: `${basePath}/data/productsShoesForMen.json`,
    containerId: "shoes-for-men",
    renderFunction: (product, container) => renderRegularProductByCategory(product, container),
  },
  DepSandal: {
    jsonFile: `${basePath}/data/productsDepSandal.json`,
    containerId: "dep-sandal",
    renderFunction: (product, container) => renderRegularProductByCategory(product, container),
  },
};

// Hàm lấy cấu hình danh mục (với fallback)
const getCategoryConfig = (category) =>
  CATEGORY_CONFIG[category] || {
    jsonFile: `data/productsHome.json`,
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

// Hàm chính
const loadDataByCategory = async (category) => {
  const { jsonFile, containerId, renderFunction } = getCategoryConfig(category);

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container element for category "${category}" not found!`);
    return;
  }

  // Sử dụng fetchData để lấy dữ liệu với basePath
  try {
    const products = await fetchData(`${basePath}/${jsonFile}`);
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

export { loadDataByCategory };
