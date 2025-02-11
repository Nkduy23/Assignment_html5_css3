import { setupHeaderFooter } from "./controllers/header-footer.controller.js";
import { listenToNavbarEvents } from "./controllers/navigation.controller.js";
import { sliderController } from "./controllers/slider.controller.js";
import { DEFAULT_SALE_END_TIME, SALE_ENDED_MESSAGE } from "./constants/sale.constants.js";
import { CountdownController } from "./controllers/countdown.controller.js";
import { handleProductLoading } from "./controllers/home.controller.js";

const initializeApp = async () => {
  try {
    await setupHeaderFooter();

    listenToNavbarEvents();

    const slider = sliderController();
    slider.init();

    const countdownCtrl = new CountdownController(DEFAULT_SALE_END_TIME, SALE_ENDED_MESSAGE);
    countdownCtrl.start();

    handleProductLoading();
  } catch (error) {
    console.error("Error initializing app:", error);
  }
};

document.addEventListener("DOMContentLoaded", initializeApp);
