import { CountdownTimer } from "../models/countdown.model.js";
import { SALE_ENDED_MESSAGE, DEFAULT_SALE_END_TIME } from "../constants/sale.constants.js";

/**
 * Khởi động bộ đếm ngược khuyến mãi
 * @param {string} [endTime] - Thời gian kết thúc khuyến mãi (mặc định lấy từ config.js nếu không có)
 * @param {string} originalPrice - Giá gốc sản phẩm
 */
export function startCountdownTimer(endTime = DEFAULT_SALE_END_TIME, originalPrice) {
  const timer = new CountdownTimer(
    endTime, // Dùng giá trị mặc định nếu không truyền
    {
      days: document.getElementById("days"),
      hours: document.getElementById("hours"),
      minutes: document.getElementById("minutes"),
      seconds: document.getElementById("seconds"),
      subtitle: document.querySelector(".flash-sale__subtitle"),
    },
    SALE_ENDED_MESSAGE
  );

  // Khi hết thời gian sale, hiển thị lại giá gốc
  timer.onEnd = function () {
    const priceElement = document.querySelector(".product-detail__price");
    if (priceElement) {
      priceElement.innerHTML = `<p class="product-detail__price">${originalPrice}</p>`;
    }
  };

  timer.start();
}
