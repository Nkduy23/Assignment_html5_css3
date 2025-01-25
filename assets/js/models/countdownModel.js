export class CountdownTimer {
    constructor(endTime, displayElements, onEndMessage) {
      this.endTime = new Date(endTime).getTime();
      this.elements = displayElements;
      this.onEndMessage = onEndMessage;
      this.interval = null;
    }
  
    // Hàm định dạng số
    static formatNumber(number) {
      return number.toString().padStart(2, "0");
    }
  
    // Hàm cập nhật bộ đếm ngược
    update() {
      const now = new Date().getTime();
      const remainingTime = this.endTime - now;
  
      if (remainingTime <= 0) {
        clearInterval(this.interval);
        if (this.elements.subtitle) {
          this.elements.subtitle.textContent = this.onEndMessage;
        }
        return;
      }
  
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  
      // Cập nhật nội dung các phần tử hiển thị thời gian
      this.elements.days.textContent = CountdownTimer.formatNumber(days);
      this.elements.hours.textContent = CountdownTimer.formatNumber(hours);
      this.elements.minutes.textContent = CountdownTimer.formatNumber(minutes);
      this.elements.seconds.textContent = CountdownTimer.formatNumber(seconds);
    }
  
    // Hàm bắt đầu bộ đếm ngược
    start() {
      this.update(); // Gọi ngay khi tải trang
      this.interval = setInterval(() => this.update(), 1000);
    }
  }
  