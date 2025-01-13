window.addEventListener("DOMContentLoaded", () => {
  const toggler = document.querySelector(".header__toggler");
  const navbarBody = document.querySelector(".nav");
  const navbarClose = document.querySelector(".nav__close");
  const navbarSearchClose = document.querySelector(".header__search-close");
  const navSearchIcon = document.querySelector(".header__action-btn-search");
  const navSearch = document.querySelector(".header__search");
  const dropdownToggles = document.querySelectorAll(".dropdown");
  const dropdownMenus = document.querySelectorAll(".nav__sublist");

  // Toggle Navbar
  function toggleNavbar() {
    const expanded = toggler.getAttribute("aria-expanded") === "true";
    toggler.setAttribute("aria-expanded", !expanded);
    toggler.setAttribute("aria-label", expanded ? "Close navigation" : "Open navigation");
    navbarBody.classList.toggle("show");
  }

  // Toggle Search
  function toggleSearch() {
    const expanded = navbarSearchClose.getAttribute("aria-expanded") === "true";
    navbarSearchClose.setAttribute("aria-expanded", !expanded);
    navbarSearchClose.setAttribute("aria-label", expanded ? "Close search" : "Open search");
    navSearch.classList.toggle("show");
  }

  // Close Navbar
  function closeNavbar() {
    toggler.setAttribute("aria-expanded", "false");
    toggler.setAttribute("aria-label", "Close navigation");
    navbarBody.classList.remove("show");
  }

  // Close Search
  function closeSearch() {
    navbarSearchClose.setAttribute("aria-expanded", "false");
    navbarSearchClose.setAttribute("aria-label", "Close search");
    navSearch.classList.remove("show");
  }

  // Toggle Dropdown Menu
  function toggleDropdown(e) {
    const dropdownToggle = e.target; // Phần tử được click
    const dropdownMenu = dropdownToggle.nextElementSibling; // Menu dropdown kế tiếp
    console.log(dropdownMenu);

    const isExpanded = dropdownToggle.getAttribute("aria-expanded") === "true";

    // Đóng tất cả dropdowns khác
    dropdownToggles.forEach((toggle) => {
      if (toggle !== dropdownToggle) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.nextElementSibling.classList.remove("active");
      }
    });

    // Toggle trạng thái dropdown hiện tại
    dropdownToggle.setAttribute("aria-expanded", !isExpanded);
    dropdownMenu.classList.toggle("active", !isExpanded);
  }

  // Event Listeners
  toggler.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleNavbar();
  });

  navbarClose.addEventListener("click", closeNavbar);
  navbarSearchClose.addEventListener("click", closeSearch);
  navSearchIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleSearch();
  });

  // Lắng nghe sự kiện click cho dropdown và loại bỏ sự kiện cũ
  dropdownToggles.forEach((toggle) => {
    toggle.removeEventListener("click", toggleDropdown); // Xóa sự kiện trùng lặp
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(e);
    });
  });

  // Đóng navbar, dropdowns khi click ngoài
  document.addEventListener("click", (e) => {
    if (!navbarBody.contains(e.target)) closeNavbar();
    if (!navSearch.contains(e.target)) closeSearch();
    if (!e.target.closest(".navbar__item")) {
      dropdownMenus.forEach((menu) => menu.classList.remove("active"));
      dropdownToggles.forEach((toggle) => toggle.setAttribute("aria-expanded", "false"));
    }
  });
});
