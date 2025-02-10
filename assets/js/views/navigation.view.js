import { handleToggle, handleClose } from "../models/navigation.model.js";
import { setupNavigation } from "../controllers/setup/setupNavigation.js";

// Hàm khởi tạo DOM của Navbar
export const createNavigationView = (config) => {
  const elements = {
    navbarBody: document.querySelector(config.navbar.body),
    navbarButton: document.querySelector(config.navbar.button),
    navbarClose: document.querySelector(config.navbar.close),
    searchBody: document.querySelector(config.search.body),
    searchButton: document.querySelector(config.search.button),
    searchClose: document.querySelector(config.search.close),
    dropdownToggles: document.querySelectorAll(config.dropdown),
  };

  return elements;
};

// Hàm mở/đóng Navbar
export const toggleNavbar = () => {
  const { navbarBody } = setupNavigation();
  const { searchBody } = setupNavigation();
  console.log(navbarBody);

  if(searchBody.getAttribute("aria-expanded") === "true") closeSearch();

  handleToggle(navbarBody, "navbar-open", "show");
};

// Hàm đóng Navbar
export const closeNavbar = () => {
  const { navbarBody } = setupNavigation();
  handleClose(navbarBody, "navbar-open", "show");
};

// Hàm mở/đóng Search
export const toggleSearch = () => {
  const { navbarBody } = setupNavigation();
  const { searchBody } = setupNavigation();
  console.log(searchBody);

  if (navbarBody.getAttribute("aria-expanded") === "true") closeNavbar();
  
  handleToggle(searchBody, "search-open", "show");
};

// Hàm đóng Search
export const closeSearch = () => {
  const { searchBody } = setupNavigation();
  handleClose(searchBody, "search-open", "show");
};

// Hàm mở/đóng Dropdown
export const toggleDropdown = (dropdownToggle) => {
  if (!dropdownToggle) {
    console.error("Dropdown toggle element not found!");
    return;
  }

  const dropdownMenu = dropdownToggle.nextElementSibling;
  if (!dropdownMenu) {
    console.error("Dropdown menu element not found!");
    return;
  }

  const isExpanded = dropdownToggle.getAttribute("aria-expanded") === "true";
  dropdownToggle.setAttribute("aria-expanded", !isExpanded);
  dropdownMenu.classList.toggle("active", !isExpanded);
};

// Đóng tất cả Dropdowns
export const closeAllDropdowns = () => {
  const { dropdownToggles } = setupNavigation();

  dropdownToggles.forEach((toggle) => {
    toggle.setAttribute("aria-expanded", "false");
    const menu = toggle.nextElementSibling;
    if (menu) menu.classList.remove("active");
  });
};

// Lắng nghe sự kiện từ DOM và gọi hàm từ Controller
export const listenToNavbarEvents = (controller) => {
  const { navbarButton, navbarClose, searchButton, searchClose, dropdownToggles } = setupNavigation();

  const addEventListenerSafe = (element, event, handler) => {
    if (element) {
      element.addEventListener(event, handler);
    }
  };

  addEventListenerSafe(navbarButton, "click", (e) => {
    e.stopPropagation();
    controller.handleNavbarToggle();
  });

  addEventListenerSafe(navbarClose, "click", (e) => {
    e.stopPropagation();
    controller.handleNavbarClose();
  });

  addEventListenerSafe(searchButton, "click", (e) => {
    e.stopPropagation();
    controller.handleSearchToggle();
  });

  addEventListenerSafe(searchClose, "click", (e) => {
    e.stopPropagation();
    controller.handleSearchClose();
  });

  dropdownToggles.forEach((toggle) => {
    addEventListenerSafe(toggle, "click", (e) => {
      e.stopPropagation();
      controller.handleDropdownToggle(toggle);
    });
  });

  document.addEventListener("click", (e) => {
    controller.handleOutsideClick(e);
  });

  console.log("Events are being listened by the View");
};
