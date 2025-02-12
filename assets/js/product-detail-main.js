import { setupHeaderFooter } from "./controllers/header-footer.controller.js";
import { listenToNavbarEvents } from "./controllers/navigation.controller.js";

const initializeProductDetailPage = async () => {
  try {
    await setupHeaderFooter();

    listenToNavbarEvents();
    
  } catch (error) {
    console.error("Error initializing product detail page:", error);
  }
};

document.addEventListener("DOMContentLoaded", initializeProductDetailPage);
