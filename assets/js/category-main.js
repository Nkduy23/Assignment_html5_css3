import { setupHeaderFooter } from "./utils/setup-header-footer.util.js";
import { setupNavbar } from "./views/navigation.view.js";
import { loadDataByCategory } from "./controllers/category.controller.js";

const initializeCategoryPage = async () => {
  try {
    await setupHeaderFooter();
    setupNavbar();

    const category = new URLSearchParams(window.location.search).get("category");
    if (category) {
      loadDataByCategory(category);
    } else {
      console.warn("Tham số 'category' không được cung cấp trong URL. Hiển thị danh mục mặc định.");
      loadDataByCategory("default");
    }
  } catch (error) {
    console.error("Error initializing category page:", error);
  }
};

document.addEventListener("DOMContentLoaded", initializeCategoryPage);