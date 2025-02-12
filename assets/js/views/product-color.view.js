const addColorChangeEventListeners = (products) => {
  const changeProductImage = (target) => {
    const color = target.dataset.color;

    const productCard = target.closest(".product-card");

    const productImage = productCard.querySelector(".product-card__image");

    const productId = productImage.dataset.productId;

    const product = products.find((item) => item.id === productId);
    if (!product) {
      console.error(`Product with ID ${productId} not found: ${productId}`);
      return;
    }

    const folder = product.category === "sale" ? "sale" : "regular";

    productImage.src = `./assets/img/${folder}/${productId}-${color}.jpg`;
  };

  const colorOptions = document.querySelectorAll(".product-card__color");
  for (const colorOption of colorOptions) {
    colorOption.addEventListener("mouseenter", (e) => changeProductImage(e.target));
    colorOption.addEventListener("click", (e) => changeProductImage(e.target));
  }
};

export { addColorChangeEventListeners };
