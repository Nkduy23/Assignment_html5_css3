// home.js
import { handleProductLoading } from "../controllers/productController.js";
import { setupHeaderFooter } from "../utils/setupHeaderFooter.js";
import { startCountdownTimer } from "./countdownView.js";
import { DEFAULT_SALE_END_TIME } from "../config.js";


document.addEventListener("DOMContentLoaded", async () => {
  try {
    await setupHeaderFooter();
    setupNavbar();
    handleProductLoading(); // Chỉ gọi ở trang cần
    startCountdownTimer(DEFAULT_SALE_END_TIME);
  } catch (error) {
    console.error("Error loading header and footer:", error);
  }
});
