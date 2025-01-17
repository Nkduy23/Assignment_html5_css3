const addColorChangeEventListeners = () => {
  const changeProductImage = (target) => {
    const color = target.dataset.color;
    if (!color) return;

    const productCard = target.closest(".product-card");
    if (!productCard) return;

    const productImage = productCard.querySelector(".product-card__image");
    if (!productImage) return;

    const productId = productImage.dataset.productId;
    if (!productId) return;

    productImage.src = `public/img/${productId}-${color}.jpg`;
  };

  // Gắn sự kiện vào các phần tử color-options
  const colorOptions = document.querySelectorAll(".product-card__color");
  for (const colorOption of colorOptions) {
    colorOption.addEventListener("mouseenter", (e) => changeProductImage(e.target));
    colorOption.addEventListener("click", (e) => changeProductImage(e.target));
  }
};

export { addColorChangeEventListeners };
