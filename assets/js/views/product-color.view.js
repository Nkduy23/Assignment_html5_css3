const addColorChangeEventListeners = (products) => {
  const changeProductImage = (target) => {
    const color = target.dataset.color;
    if (!color) return;

    const productCard = target.closest(".product-card");
    if (!productCard) return;

    const productImage = productCard.querySelector(".product-card__image");
    if (!productImage) return;

    const productId = productImage.dataset.productId;
    if (!productId) return;

    // Kiểm tra products có giá trị hợp lệ trước khi gọi find()
    const product = products.find((item) => item.id === productId);
    if (!product) {
      console.error(`Không tìm thấy sản phẩm với ID: ${productId}`);
      return;
    }

    // Xác định thư mục dựa trên trường category từ JSON
    const folder = product.category === "sale" ? "sale" : "regular";

    // Cập nhật đường dẫn ảnh
    productImage.src = `./assets/img/${folder}/${productId}-${color}.jpg`;
  };

  // Gắn sự kiện vào các phần tử color-options
  const colorOptions = document.querySelectorAll(".product-card__color");
  for (const colorOption of colorOptions) {
    colorOption.addEventListener("mouseenter", (e) => changeProductImage(e.target));
    colorOption.addEventListener("click", (e) => changeProductImage(e.target));
  }
};

export { addColorChangeEventListeners };
