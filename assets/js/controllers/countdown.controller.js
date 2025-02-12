import { CountdownTimer } from "../models/countdown.model.js";
import { updateCountdownView, displaySaleEndedMessage } from "../views/countdown.view.js";

export class CountdownController {
  constructor(endTime, onEndMessage) {
    this.timer = new CountdownTimer(endTime);
    this.onEndMessage = onEndMessage;
  }

  start() {
    // Khởi tạo bộ đếm ngược
    // remainingTime là callback
    this.timer.start((remainingTime) => {
      if (remainingTime <= 0) {
        displaySaleEndedMessage(this.onEndMessage);
        this.timer.stop();
      } else {
        updateCountdownView(remainingTime);
      }
    });
  }
}



// Bước	Hành động của hàm?
// 1	Controller gọi this.timer.start(callback)	Controller
// 2	Model chạy setInterval(), tính toán thời gian	Model
// 3	Model gọi callback(remainingTime), gửi dữ liệu về Controller	Model
// 4	Controller nhận remainingTime và gọi updateCountdownView()	Controller
// 5	Giao diện cập nhật số ngày, giờ, phút, giây còn lại	View

