document.addEventListener("DOMContentLoaded", function () {
    const orderSummary = document.getElementById("order-summary");
    const checkoutTotal = document.getElementById("checkout-total");
    const checkoutForm = document.getElementById("checkout-form");
    const addressInput = document.getElementById("address");
    const getLocationBtn = document.getElementById("get-location");
    const locationStatus = document.getElementById("location-status");

    // Lấy danh sách sản phẩm từ localStorage
    let cartItems = JSON.parse(localStorage.getItem("checkoutCart")) || [];

    if (cartItems.length === 0) {
      orderSummary.innerHTML = "<tr><td colspan='4'>Không có sản phẩm nào trong đơn hàng.</td></tr>";
      return;
    }

    let total = 0;
    cartItems.forEach((item) => {
      const itemTotal = parseFloat(item.price.replace(/[^0-9]/g, "")) * item.quantity;
      total += itemTotal;

      const row = document.createElement("tr");
      row.innerHTML = `
  <td>${item.name}</td>
  <td>${item.quantity}</td>
  <td>${item.price} đ</td>
  <td>${itemTotal.toLocaleString()} đ</td>
`;
      orderSummary.appendChild(row);
    });

    checkoutTotal.textContent = total.toLocaleString();

    // Xử lý thanh toán khi submit form
    checkoutForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const fullname = document.getElementById("fullname").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const address = addressInput.value.trim();
      const email = document.getElementById("email").value.trim();
      const paymentMethod = document.getElementById("payment-method").value;

      if (!fullname || !phone || !address || !paymentMethod) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      const orderData = {
        fullname,
        phone,
        address,
        email,
        paymentMethod,
        items: cartItems,
        totalPrice: total,
      };

      console.log("Dữ liệu đơn hàng:", orderData);

      // Xóa giỏ hàng sau khi đặt hàng
      localStorage.removeItem("checkoutCart");
      localStorage.removeItem("cart");

      alert("Thanh toán thành công!");

      // Chuyển hướng về trang chủ
      window.location.href = "../../index.html";
    });

    // Xử lý lấy vị trí tự động
    getLocationBtn.addEventListener("click", function () {
      if (!navigator.geolocation) {
        locationStatus.textContent = "Trình duyệt của bạn không hỗ trợ định vị.";
        return;
      }

      locationStatus.textContent = "Đang lấy vị trí...";

      navigator.geolocation.getCurrentPosition(
        async function (position) {
          const { latitude, longitude } = position.coords;
          try {
            // Sử dụng OpenStreetMap API để lấy địa chỉ từ tọa độ
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            if (data && data.display_name) {
              addressInput.value = data.display_name; // Điền địa chỉ vào ô input
              locationStatus.textContent = "Đã lấy vị trí thành công!";
            } else {
              locationStatus.textContent = "Không tìm thấy địa chỉ.";
            }
          } catch (error) {
            locationStatus.textContent = "Lỗi khi lấy địa chỉ.";
          }
        },
        function () {
          locationStatus.textContent = "Không thể lấy vị trí. Vui lòng thử lại.";
        }
      );
    });
  });