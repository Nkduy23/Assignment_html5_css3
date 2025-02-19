import { setupHeaderFooter } from "./controllers/header-footer.controller.js";
import { listenToNavbarEvents } from "./controllers/navigation.controller.js";
import { handleUserAuth } from "./controllers/auth.controller.js";
const initializeProductDetailPage = async () => {
  try {
    await setupHeaderFooter();

    listenToNavbarEvents();

    handleUserAuth();
    
  } catch (error) {
    console.error("Error initializing product detail page:", error);
  }
};

document.addEventListener("DOMContentLoaded", initializeProductDetailPage);
