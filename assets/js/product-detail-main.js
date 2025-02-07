import { setupHeaderFooter } from "./utils/setup-header-footer.util.js";
import { setupNavbar } from "./views/navigation.view.js";

const initializeProductDetailPage = async () => {
  try {
    await setupHeaderFooter();
    setupNavbar();
  } catch (error) {
    console.error("Error initializing product detail page:", error);
  }
};

document.addEventListener("DOMContentLoaded", initializeProductDetailPage);