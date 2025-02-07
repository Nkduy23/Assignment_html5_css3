const updateProductProgress = () => {
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
};

export { updateProductProgress };
