export function dragStart(event) {
  console.log("dragStart được gọi với event:", event);
  
  const productElement = event.target.closest(".product-card");
  console.log("productElement:", productElement);

  if (!productElement) {
    console.log("Không tìm thấy productElement");
    return;
  }

  const productId = productElement.querySelector("img").dataset.productId;
  const productName = productElement.querySelector(".product-card__title").textContent;
  const productImage = productElement.querySelector("img").src;
  const productPrice = productElement.querySelector("img").dataset.productPrice;
  const productSize = productElement.querySelector("img").dataset.productSize;
  const productColor = productElement.querySelector("img").dataset.productColor;

  const productData = {
    id: productId,
    name: productName,
    image: productImage,
    price: productPrice,
    size: productSize,
    color: productColor,
    quantity: 1,
  };

  console.log("Dữ liệu sản phẩm được kéo:", productData);
  event.dataTransfer.setData("application/json", JSON.stringify(productData));
}


// Hàm cho phép thả vào khu vực giỏ hàng
export function allowDrop(event) {
  event.preventDefault();
}

// Hàm xử lý khi thả sản phẩm vào giỏ hàng
export function drop(event) {
  event.preventDefault();

  const productDataJSON = event.dataTransfer.getData("application/json");
  if (!productDataJSON) {
    console.log("Không có dữ liệu được kéo vào");
    return;
  }

  const productData = JSON.parse(productDataJSON);
  console.log("Dữ liệu thả vào:", productData); // Kiểm tra dữ liệu có đúng không

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find((item) => item.id === productData.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...productData, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  if (typeof window.renderCart === "function") {
    window.renderCart();
  }
}
