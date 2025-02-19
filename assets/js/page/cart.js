window.renderCart = function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartArea = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");

    cartArea.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((item, index) => {
      const cartItem = document.createElement("tr");
      const cleanPrice = parseFloat(item.price.replace(/[^0-9]/g, "")) || 0;

      cartItem.innerHTML = `
  <td>${index + 1}</td>
  <td>${item.name}</td>
  <td><img src="${item.image}" alt="${item.name}" width="50"></td>
  <td>${cleanPrice.toLocaleString()} đ</td>
  <td>${item.color}</td>
  <td>
    <select class="cart-size" data-id="${item.id}">
      <option value="S" ${item.size === "S" ? "selected" : ""}>S</option>
      <option value="M" ${item.size === "M" ? "selected" : ""}>M</option>
      <option value="L" ${item.size === "L" ? "selected" : ""}>L</option>
    </select>
  </td>
  <td>${item.quantity}</td>
  <td>
    <button class="remove-btn" data-id="${item.id}">Xoá</button>
  </td>
`;
      cartArea.appendChild(cartItem);
      totalPrice += cleanPrice * item.quantity;
    });

    totalPriceEl.textContent = totalPrice.toLocaleString();

    attachRemoveEvent();
  };

  document.addEventListener("change", (event) => {
    if (event.target.classList.contains("cart-size")) {
      const productId = event.target.getAttribute("data-id");
      const newSize = event.target.value;
      updateCartSize(productId, newSize);
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const checkoutBtn = document.querySelector(".checkout-btn");

    checkoutBtn.addEventListener("click", function () {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

      if (cartItems.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
      }

      // Lưu thông tin giỏ hàng vào localStorage trước khi chuyển trang
      localStorage.setItem("checkoutCart", JSON.stringify(cartItems));

      // Chuyển hướng sang trang thanh toán
      window.location.href = "checkout.html";
    });
  });

  function updateCartSize(productId, newSize) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Tìm sản phẩm trong giỏ hàng
    const productIndex = cart.findIndex((item) => item.id === productId);
    if (productIndex !== -1) {
      cart[productIndex].size = newSize;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }

  function attachRemoveEvent() {
    document.querySelectorAll(".remove-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        alert("Bạn có chắc muốn xóa sản phẩm này không ?");
        const productId = event.target.dataset.id;
        removeFromCart(productId);
      });
    });
  }

  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.renderCart();
  }

  // Khi trang giỏ hàng tải, gọi renderCart() để hiển thị danh sách sản phẩm
  document.addEventListener("DOMContentLoaded", window.renderCart);