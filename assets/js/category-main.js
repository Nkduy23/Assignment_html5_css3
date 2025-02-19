import { setupHeaderFooter } from "./controllers/header-footer.controller.js";
import { listenToNavbarEvents } from "./controllers/navigation.controller.js";
import { loadDataByCategory } from "./controllers/category.controller.js";
import { handleUserAuth } from "./controllers/auth.controller.js";
import { dragStart, allowDrop, drop } from "./controllers/drag-and-drop.controller.js"; // Import các hàm kéo thả


const initializeCategoryPage = async () => {
  try {
    await setupHeaderFooter();

    listenToNavbarEvents();

    handleUserAuth();

    
    // Gán sự kiện kéo thả sau khi sản phẩm đã render
    setTimeout(() => {
      document.querySelectorAll(".product-card__image").forEach((img) => {
        console.log("Thêm sự kiện dragstart vào:", img);
        img.addEventListener("dragstart", (event) => {
          console.log("dragstart event được kích hoạt", event);
          dragStart(event);
        });
      });
    }, 500); // Đợi một chút để đảm bảo sản phẩm đã có trong DOM

    const cartIcon = document.getElementById("cart-icon");
    cartIcon.addEventListener("drop", drop);
    cartIcon.addEventListener("dragover", allowDrop);

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
