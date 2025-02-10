import { setupHeaderFooter } from "./utils/setup-header-footer.util.js";
import { navbarController } from "./controllers/navigation.controller.js";
import { listenToNavbarEvents } from "./views/navigation.view.js";

const initializeProductDetailPage = async () => {
  try {
    await setupHeaderFooter();
    // Điều phối logic điều hướng giữa View và Model
    const navbarCtrl = navbarController();
    listenToNavbarEvents(navbarCtrl);
    
  } catch (error) {
    console.error("Error initializing product detail page:", error);
  }
};

document.addEventListener("DOMContentLoaded", initializeProductDetailPage);
