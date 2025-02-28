import { getHomeProducts } from "../models/product.model.js";
import { renderSaleProduct, renderRegularProductByCategory } from "../views/product-render.view.js";
import { addColorChangeEventListeners } from "../views/product-color.view.js";
import { updateProductProgress } from "../views/product-progress.view.js";

export function handleProductLoading() {
  const saleContainer = document.getElementById("flash-sale-products");

  if (saleContainer) {
    console.log("Sale container found! Fetching sale data...");
    loadHomePage(saleContainer);
  } else {
    console.log("No sale container found. Rendering regular products...");
    loadHomePage();
  }
}

export const loadHomePage = async (saleContainer = null) => {
  try {
    const products = await getHomeProducts();

    if (saleContainer && products.saleProducts) {
      products.saleProducts.forEach((product) => {
        renderSaleProduct(product, saleContainer);
      });
    }

    if (products.regularProducts) {
      products.regularProducts.forEach((product) => {
        renderRegularProductByCategory(product);
      });
    }

    // Gộp tất cả sản phẩm để xử lý sự kiện màu sắc
    const allProducts = [...products.saleProducts, ...products.regularProducts];
    console.log("allProducts", allProducts);
    
    addColorChangeEventListeners(allProducts);  
    updateProductProgress();
  } catch (error) {
    console.error("Error loading home page:", error);
  }
};
