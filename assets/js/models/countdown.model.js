export class CountdownTimer {
  constructor(endTime) {
    this.endTime = new Date(endTime).getTime();
    this.interval = null;
  }

  /**
   * Tính toán thời gian còn lại
   * @returns {Object}
   */
  calculateRemainingTime() {
    const now = new Date().getTime();
    const remainingTime = this.endTime - now;

    if (remainingTime <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  /**
   * Bắt đầu bộ đếm ngược
   * @param {Function} callback
   */
  start(callback) {
    this.interval = setInterval(() => {
      const remainingTime = this.calculateRemainingTime();
      callback(remainingTime);

      if (remainingTime.days === 0 && remainingTime.hours === 0 && remainingTime.minutes === 0 && remainingTime.seconds === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  /**
   * Dừng bộ đếm ngược
   */
  stop() {
    clearInterval(this.interval);
  }
}
