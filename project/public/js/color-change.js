// Hàm gắn sự kiện vào các phần tử color-options sau khi sản phẩm đã được render
function addColorChangeEventListeners() {
    document.querySelectorAll('.product-card__color').forEach((colorOption) => {
      colorOption.addEventListener("mouseenter", (e) => {
        const color = e.target.dataset.color;
        // closest tìm phần tử tổ tiên của màu trên phần tử color-options
        const productCard = e.target.closest(".product-card");
        const productImage = productCard.querySelector(".product-card__image");
        productImage.src = `public/img/${productImage.dataset.productId}-${color}.jpg`;
      });
  
      colorOption.addEventListener("click", (e) => {
        const color = e.target.dataset.color;
        const productCard = e.target.closest(".product-card");
        const productImage = productCard.querySelector(".product-card__image");
        productImage.src = `public/img/${productImage.dataset.productId}-${color}.jpg`;
      });
    });
  }
  
  export { addColorChangeEventListeners };
  