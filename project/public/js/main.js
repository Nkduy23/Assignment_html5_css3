import { loadData } from "./load-data.js";

// Gọi loadData khi trang được tải xong (load dữ liệu mặc định)
document.addEventListener("DOMContentLoaded", () => {
  loadData(); // Tải dữ liệu từ products-main.json

  // Lắng nghe sự kiện click vào nút "Xem tất cả"
  const saleCategoryButton = document.getElementById("sale-category");
  // console.log(`saleCategoryButton: ${saleCategoryButton}`);

  if (saleCategoryButton) {
    saleCategoryButton.addEventListener("click", (event) => {
      event.preventDefault(); // Ngăn không cho thẻ <a> tải lại trang

      // Chuyển hướng tới trang sale.html với tham số category=sale
      window.location.href = "sale.html?category=sale";
    });
  } else {
    console.error("Không tìm thấy phần tử #sale-category trong DOM!");
  }
});
