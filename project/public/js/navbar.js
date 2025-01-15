function setupNavbar() {
  // Configurations
  const config = {
    navbar: {
      body: ".nav",
      button: ".nav__button-bar",
      close: ".nav__button-close",
    },

    search: {
      body: ".header__search",
      button: ".header__action-button-open",
      close: ".header__search-button-close",
    },

    dropdown: ".dropdown",
  };

  // Get elements
  const navbarBody = document.querySelector(config.navbar.body);
  const navbarButton = document.querySelector(config.navbar.button);
  const navbarClose = document.querySelector(config.navbar.close);

  const searchBody = document.querySelector(config.search.body);
  const searchButton = document.querySelector(config.search.button);
  const searchClose = document.querySelector(config.search.close);

  const dropdownToggles = document.querySelectorAll(config.dropdown);

  // Utility: Add event listener safely
  const addEventListenerSafe = (element, event, handler) => {
    if (element) {
      element.addEventListener(event, handler);
    }
  };

  const toggleState = (element, stateClass, expanded = null) => {
    if (!element) return;
    const isExpanded = expanded !== null ? expanded : element.getAttribute("aria-expanded") === "true";

    // Cập nhật aria-expanded
    element.setAttribute("aria-expanded", expanded !== null ? expanded : !isExpanded);

    // Thêm hoặc xóa class dựa trên trạng thái expanded
    if (expanded === false) {
      element.classList.remove(stateClass); // Xóa class nếu expanded = false
    } else if (expanded === true) {
      element.classList.add(stateClass); // Thêm class nếu expanded = true
    } else {
      element.classList.toggle(stateClass); // Toggle class nếu không truyền giá trị expanded
    }
  };

  // Toggle Navbar
  const toggleNavbar = () => {
    // Nếu navbarSearch có class "show" (kết quả false), loại bỏ class "search-open" khỏi document.body.
    document.body.classList.toggle("navbar-open", !navbarBody.classList.contains("show"));
    toggleState(navbarBody, "show");
  };

  // Close Navbar
  const closeNavbar = () => {
    document.body.classList.remove("navbar-open");
    toggleState(navbarBody, "show", false);
  };

  // Toggle Search
  const toggleSearch = () => {
    document.body.classList.toggle("search-open", !searchBody.classList.contains("show"));
    toggleState(searchBody, "show");
  };

  // Close Navbar
  const closeSearch = () => {
    document.body.classList.remove("search-open");
    toggleState(searchBody, "show", false);
  };

  // Toggle Dropdown
  const toggleDropdown = (dropdownToggle) => {
    const dropdownMenu = dropdownToggle.nextElementSibling;
    if (!dropdownMenu) return;

    // Lấy giá trị của aria-expanded để kiểm tra trạng thái của menu
    const expanded = dropdownToggle.getAttribute("aria-expanded") === "true";

    // Đóng tất cả các dropdown khác
    closeAllDropdowns();

    // Nếu dropdown đã mở, đóng nó, nếu chưa mở, mở nó
    if (expanded) {
      // Đã mở, đóng lại
      dropdownToggle.setAttribute("aria-expanded", "false");
      dropdownMenu.classList.remove("active");
    } else {
      // Chưa mở, mở nó
      dropdownToggle.setAttribute("aria-expanded", "true");
      dropdownMenu.classList.add("active");
    }
  };

  // Close all dropdowns
  const closeAllDropdowns = () => {
    dropdownToggles.forEach((toggle) => {
      toggle.setAttribute("aria-expanded", "false");
      const menu = toggle.nextElementSibling;
      if (menu) {
        menu.classList.remove("active");
      }
    });
  };

  // Event Listeners
  addEventListenerSafe(navbarButton, "click", (e) => {
    e.stopPropagation();
    toggleNavbar();
  });

  addEventListenerSafe(navbarClose, "click", (e) => {
    e.stopPropagation();
    closeNavbar();
  });

  addEventListenerSafe(searchButton, "click", (e) => {
    e.stopPropagation();
    toggleSearch();
  });

  addEventListenerSafe(searchClose, "click", (e) => {
    e.stopPropagation();
    closeSearch();
  });

  dropdownToggles.forEach((toggle) => {
    toggle.removeEventListener("click", toggleDropdown); // Ensure no duplicate listeners
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(toggle);
    });
  });

  // Close navbar and dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(config.navbar.body) && !e.target.closest(config.navbar.button)) {
      closeNavbar();
    }
    if (!e.target.closest(config.search.body) && !e.target.closest(config.search.button)) {
      closeSearch();
    }
    if (!e.target.closest(".dropdown")) {
      closeAllDropdowns();
    }
  });
}
