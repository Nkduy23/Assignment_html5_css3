export const handleUserAuth = () => {
  const userInfo = document.querySelector(".header__user-info");
  const loginButton = document.querySelector(".header__action-button-login");
  const logoutButton = document.querySelector(".header__action-button-logout");

  if (!userInfo || !loginButton || !logoutButton) {
    console.warn("Không tìm thấy phần tử header, kiểm tra lại quá trình render.");
    return;
  }

  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    userInfo.innerHTML = loggedInUser.hoTen;
    userInfo.style.display = "inline-block";

    loginButton.style.display = "none";
    logoutButton.style.display = "inline-block";
  } else {
    userInfo.style.display = "none";
    loginButton.style.display = "inline-block";
    logoutButton.style.display = "none";
  }

  logoutButton.addEventListener("click", function () {
    sessionStorage.removeItem("loggedInUser");
    window.location.reload();
  });
};
