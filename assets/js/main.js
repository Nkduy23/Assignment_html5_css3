import { setupHeaderFooter } from "./utils/setup-header-footer.util.js";
import { setupNavbar } from "./views/navigation.view.js";
import { setupSlider } from "./views/slider.view.js";
import { DEFAULT_SALE_END_TIME } from "./constants/sale.constants.js";
import { startCountdownTimer } from "./views/countdown.view.js";
import { handleProductLoading } from "./controllers/product.controller.js";

const initializeApp = async () => {
  try {
    await setupHeaderFooter();
    setupNavbar();
    setupSlider();
    handleProductLoading();
    startCountdownTimer(DEFAULT_SALE_END_TIME);
  } catch (error) {
    console.error("Error initializing app:", error);
  }
};

document.addEventListener("DOMContentLoaded", initializeApp);
