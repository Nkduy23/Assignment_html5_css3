/**
 * Cập nhật giao diện bộ đếm ngược
 * @param {Object} remainingTime
 */
export function updateCountdownView({ days, hours, minutes, seconds }) {
  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  daysElement.textContent = formatNumber(days);
  hoursElement.textContent = formatNumber(hours);
  minutesElement.textContent = formatNumber(minutes);
  secondsElement.textContent = formatNumber(seconds);
}

/**
 * Hiển thị thông báo khi hết thời gian
 * @param {string} message
 */
export function displaySaleEndedMessage(message) {
  const subtitleElement = document.querySelector(".flash-sale__subtitle");
  if (subtitleElement) {
    subtitleElement.textContent = message;
  }
}

/**
 * Định dạng số
 * @param {number} number
 * @returns {string}
 */
function formatNumber(number) {
  return number.toString().padStart(2, "0");
}
