import { loadDataByCategory } from "./loadDataByCategory.js";

// Lấy giá trị "category" từ URL
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category"); // Lấy giá trị category từ URL
  console.log(`Category from URL: ${category}`);

  if (category) {
    loadDataByCategory(category); // Gọi hàm để tải dữ liệu theo category
  } else {
    console.error("Không có tham số 'category' trong URL!");
  }
});
