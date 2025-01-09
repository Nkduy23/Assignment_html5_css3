// Thời gian kết thúc
const saleEndTime = new Date("2025-01-15T12:00:00").getTime();


// Lấy các phần tử hiển thị thời gian 
const daysElem = document.getElementById("days");
const hoursElem = document.getElementById("hours");
const minutesElem = document.getElementById("minutes");
const secondsElem = document.getElementById("seconds");

// Hàm cập nhật bộ đếm ngược
function updateCountdown() {
    const now = new Date().getTime();
    const remainingTime = saleEndTime - now;

    if(remainingTime <=0) {
        clearInterval(countdownInterval);
        document.querySelector(".flash-sale__subtitle").textContent = "Khuyến mãi đã kết thúc";
        return;
    }

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    // Cập nhập nội dung cho các phần từ hiển thị thời gian 
    daysElem.textContent = days.toString().padStart(2, "0");
    hoursElem.textContent = hours.toString().padStart(2, "0");
    minutesElem.textContent = minutes.toString().padStart(2, "0");
    secondsElem.textContent = seconds.toString().padStart(2, "0");
}

// Gọi hàm mỗi giây để cập nhật thời gian
const countdownInterval = setInterval(updateCountdown,1000);

// Gọi ngay khi tải trang để cập nhập lần đầu
updateCountdown();