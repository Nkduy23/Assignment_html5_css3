import { CountdownTimer } from "../models/countdown.model.js";
import { updateCountdownView, displaySaleEndedMessage } from "../views/countdown.view.js";

export class CountdownController {
  constructor(endTime, onEndMessage) {
    this.timer = new CountdownTimer(endTime);
    this.onEndMessage = onEndMessage;
  }

  start() {
    // Khởi tạo bộ đếm ngược
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
