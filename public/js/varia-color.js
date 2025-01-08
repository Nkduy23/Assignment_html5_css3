// Xử lý đổi ảnh cho sản phẩm SALE
document
  .querySelectorAll('.product-card .product-card__color')
  .forEach((colorOption) => {
    // Hàm cập nhật ảnh
    const updateImage = (e) => {
      const color = e.target.dataset.color;
      const productCard = e.target.closest(".product-card");
      const productImage = productCard.querySelector(".product-card__image");
      const productId = productImage.dataset.productId;

      // Đổi ảnh sản phẩm theo màu đã chọn
      productImage.src = `/public/img/${productId}-${color}.jpg`;
    };

    // Xử lý hover cho máy tính
    colorOption.addEventListener("mouseenter", updateImage);

    // Xử lý click cho điện thoại
    colorOption.addEventListener("click", updateImage);
  });



// Cập nhật % và thanh tiến độ từ dữ liệu
document.querySelectorAll(".product-card").forEach((productCard) => {
    const progressBar = productCard.querySelector(".product-card__progress-bar");
    if (progressBar) {
      const progress = progressBar.getAttribute("data-progress") || 0;
      progressBar.style.width = `${progress}%`;
    }
  
    // Xử lý riêng cho sản phẩm SALE
    if (productCard.dataset.type === "sale") {
      const salePercentage = productCard.querySelector(".product-card__sale-label");
      if (salePercentage) {
        const sale = salePercentage.getAttribute("data-sale") || 0;
        salePercentage.textContent = `Sale ${sale}`;
      }
    }
});
