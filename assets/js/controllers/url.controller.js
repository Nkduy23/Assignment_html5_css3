import { loadDataByCategory } from "./category.controller.js";

// Lấy tham số từ url
const getURLParameter = (paramName) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName);
};

// Khỏi tạo khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  const category = getURLParameter("category");

  if (category) {
    loadDataByCategory(category);
  } else {
    console.console.warn("Tham số 'category' không được cung cấp trong URL. Hiện thị danh mục mặc định");

    loadDataByCategory("default");
  }
});
