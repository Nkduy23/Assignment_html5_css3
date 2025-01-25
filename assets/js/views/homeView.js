// home.js
import { handleProductLoading } from "../controllers/productController.js";
import { setupHeaderFooter } from "../utils/setupHeaderFooter.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await setupHeaderFooter();
    setupNavbar();
    handleProductLoading(); // Chỉ gọi ở trang cần
  } catch (error) {
    console.error("Error loading header and footer:", error);
  }
});
