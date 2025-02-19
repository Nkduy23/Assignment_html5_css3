document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".login-box form");

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const taiKhoan = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find((user) => user.taiKhoan === taiKhoan && user.password === password);

      if (user) {
        sessionStorage.setItem("loggedInUser", JSON.stringify(user));

        if (taiKhoan === "admin") {
          alert("Chào mừng Admin!");
          window.location.href = "../../admin.html"; // Chưa có sẽ làm sao
        } else {
          window.location.href = "../../index.html";
        }
      } else {
        alert("Sai tài khoản hoặc mật khẩu!");
      }
    });
  });