import { CountdownTimer } from "../models/countdownModel.js";

// Khởi tạo và sử dụng lớp CountdownTimer
document.addEventListener("DOMContentLoaded", () => {
  const timer = new CountdownTimer(
    "2025-01-25T12:00:00", // Thời gian kết thúc
    {
      days: document.getElementById("days"),
      hours: document.getElementById("hours"),
      minutes: document.getElementById("minutes"),
      seconds: document.getElementById("seconds"),
      subtitle: document.querySelector(".flash-sale__subtitle"), // Phần tử thông báo
    },
    "Khuyến mãi đã kết thúc" // Thông báo khi kết thúc
  );

  timer.start();
});
