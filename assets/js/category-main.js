import { setupHeaderFooter } from "./controllers/header-footer.controller.js";
import { listenToNavbarEvents } from "./controllers/navigation.controller.js";
import { loadDataByCategory } from "./controllers/category.controller.js";

const initializeCategoryPage = async () => {
  try {
    await setupHeaderFooter();

    listenToNavbarEvents();

    const category = new URLSearchParams(window.location.search).get("category");
    if (category) {
      loadDataByCategory(category);
    } else {
      console.warn("Category parameter not found in URL. Loading default category.");
      loadDataByCategory("default");
    }
  } catch (error) {
    console.error("Error initializing category page:", error);
  }
};

document.addEventListener("DOMContentLoaded", initializeCategoryPage);
