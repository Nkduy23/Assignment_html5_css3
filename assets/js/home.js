import { setupHeaderFooter } from "./controllers/header-footer.controller.js";
import { listenToNavbarEvents } from "./controllers/navigation.controller.js";
import { sliderController } from "./controllers/slider.controller.js";
import { DEFAULT_SALE_END_TIME, SALE_ENDED_MESSAGE } from "./constants/sale.constants.js";
import { CountdownController } from "./controllers/countdown.controller.js";
import { handleProductLoading } from "./controllers/home.controller.js";
import { handleUserAuth } from "./controllers/auth.controller.js";
import { dragStart, allowDrop, drop } from "./controllers/drag-and-drop.controller.js";

const initializeApp = async () => {
  try {
    await setupHeaderFooter();
    listenToNavbarEvents();

    const slider = sliderController();
    slider.init();

    const countdownCtrl = new CountdownController(DEFAULT_SALE_END_TIME, SALE_ENDED_MESSAGE);
    countdownCtrl.start();

    await handleProductLoading();
    handleUserAuth(); 

    setTimeout(() => {
      document.querySelectorAll(".product-card__image").forEach((img) => {
        img.addEventListener("dragstart", (event) => {
          dragStart(event);
        });
      });
    }, 500); // Đợi một chút để đảm bảo sản phẩm đã có trong DOM

    const cartIcon = document.getElementById("cart-icon");
    cartIcon.addEventListener("drop", drop);
    cartIcon.addEventListener("dragover", allowDrop);
    
  } catch (error) {
    console.error("Error initializing app:", error);
  }
};


document.addEventListener("DOMContentLoaded", initializeApp);
