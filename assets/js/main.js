import { setupHeaderFooter } from "./utils/setup-header-footer.util.js";
import { navbarController } from "./controllers/navigation.controller.js";
import { listenToNavbarEvents } from "./views/navigation.view.js";
import { sliderConfig } from "./controllers/setup/setupSlider.js";
import { DEFAULT_SALE_END_TIME, SALE_ENDED_MESSAGE } from "./constants/sale.constants.js";
import { CountdownController } from "./controllers/countdown.controller.js";
import { handleProductLoading } from "./controllers/home.controller.js";

const initializeApp = async () => {
  try {
    // Khởi tạo header và footer
    await setupHeaderFooter();

    // Điều phối logic điều hướng giữa View và Model
    const navbarCtrl = navbarController();
    listenToNavbarEvents(navbarCtrl);

    // Khởi tạo slider
    sliderConfig();

    // Bắt đầu đồng hồ đếm ngược
    const countdownCtrl = new CountdownController(DEFAULT_SALE_END_TIME, SALE_ENDED_MESSAGE);
    countdownCtrl.start();

    // Load sản phẩm
    handleProductLoading();
  } catch (error) {
    console.error("Error initializing app:", error);
  }
};

document.addEventListener("DOMContentLoaded", initializeApp);
