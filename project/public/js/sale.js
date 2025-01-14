import { loadDataByCategory } from "./loadDataByCategory.js";

// Lấy giá trị "category" từ URL
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  if (category) {
    loadDataByCategory(category);
  } else {
    console.error("Không có tham số 'category' trong URL!");
  }
});
