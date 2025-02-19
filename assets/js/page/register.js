document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const hoTen = document.getElementById("hoTen").value;
      const email = document.getElementById("email").value;
      const taiKhoan = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
      }

      // Lấy danh sách user từ localStorage
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Kiểm tra tài khoản hoặc email đã tồn tại chưa
      const isExist = users.some((user) => user.email === email || user.taiKhoan === taiKhoan);

      if (isExist) {
        alert("Email hoặc tài khoản đã tồn tại!");
        return;
      }

      // Lưu thông tin user vào localStorage
      const newUser = { hoTen, email, taiKhoan, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Đăng ký thành công! Chuyển hướng đến trang đăng nhập...");
      window.location.href = "login.html";
    });
  });