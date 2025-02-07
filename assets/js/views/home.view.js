import { setupHeaderFooter } from "../utils/setup-header-footer.util.js";
import { handleProductLoading } from "../controllers/product.controller.js";
import { startCountdownTimer } from "./countdown.view.js";
import { DEFAULT_SALE_END_TIME } from "../constants/sale.constants.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await setupHeaderFooter();
    setupNavbar();
    handleProductLoading();
    startCountdownTimer(DEFAULT_SALE_END_TIME);
  } catch (error) {
    console.error("Error loading header and footer:", error);
  }
});
