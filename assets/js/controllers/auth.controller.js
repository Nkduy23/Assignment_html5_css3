export const handleUserAuth = () => {
  // Lấy phần tử sau khi header đã được render
  const userInfo = document.querySelector(".header__user-info");
  const loginButton = document.querySelector(".header__action-button-login");
  const logoutButton = document.querySelector(".header__action-button-logout");

  console.log("userInfo:", userInfo);
  console.log("loginButton:", loginButton);
  console.log("logoutButton:", logoutButton);

  if (!userInfo || !loginButton || !logoutButton) {
    console.warn("Không tìm thấy phần tử header, kiểm tra lại quá trình render.");
    return;
  }

  // Lấy thông tin user từ LocalStorage
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  console.log("users:", loggedInUser);

  // Kiểm tra xem loggedInUser có tồn tại và có thông tin không
  if (loggedInUser) {

    // Hiển thị thông tin người dùng
    userInfo.innerHTML = `Xin chào, ${loggedInUser.hoTen}`;
    userInfo.style.display = "inline-block";

    // Ẩn nút đăng nhập, hiển thị nút đăng xuất
    loginButton.style.display = "none";
    logoutButton.style.display = "inline-block";
  } else {
    // Nếu không có người dùng đăng nhập
    userInfo.style.display = "none";
    loginButton.style.display = "inline-block";
    logoutButton.style.display = "none";
  }

  // Xử lý đăng xuất
  logoutButton.addEventListener("click", function () {
    sessionStorage.removeItem("loggedInUser"); // Xóa dữ liệu đăng nhập
    alert("Bạn đã đăng xuất!");
    window.location.reload(); // Reload lại trang để cập nhật giao diện
  });
};
