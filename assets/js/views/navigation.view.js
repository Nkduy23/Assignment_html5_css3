const toggleState = (element, toggleClass, expanded = null) => {
  const isExpanded = expanded !== null ? expanded : element.getAttribute("aria-expanded") === "true";
  element.setAttribute("aria-expanded", expanded !== null ? expanded : !isExpanded);

  if (expanded === false) {
    element.classList.remove(toggleClass);
  } else if (expanded === true) {
    element.classList.add(toggleClass);
  } else {
    element.classList.toggle(toggleClass);
  }
};

const handleToggle = (element, bodyClass, toggleClass) => {
  if (element) {
    const isOpen = element.classList.contains(toggleClass);
    document.body.classList.toggle(bodyClass, !isOpen);
    toggleState(element, toggleClass);
  } else {
    console.warn(
      `handleToggle failed: Target element is ${element}. 
      Ensure the element exists and is correctly selected before toggling '${toggleClass}'.`
    );
  }
};

const handleClose = (element, bodyClass, closeClass) => {
  if (element) {
    document.body.classList.remove(bodyClass);
    element.classList.remove(closeClass);
    element.setAttribute("aria-expanded", "false");
  } else {
    console.warn(
      `handleClose failed: Target element is ${element}. 
      Ensure the element exists and is correctly selected before removing '${closeClass}'.`
    );
  }
};

// Hàm mở/đóng Navbar
export const toggleNavbar = (navbarConfig) => {
  const { navbarBody, searchBody } = navbarConfig;

  if (searchBody.getAttribute("aria-expanded") === "true") closeSearch(navbarConfig);

  handleToggle(navbarBody, "navbar-open", "show");
};

// Hàm đóng Navbar
export const closeNavbar = (navbarConfig) => {
  const { navbarBody } = navbarConfig;
  handleClose(navbarBody, "navbar-open", "show");
};

// Hàm mở/đóng Search
export const toggleSearch = (navbarConfig) => {
  const { navbarBody, searchBody } = navbarConfig;

  if (navbarBody.getAttribute("aria-expanded") === "true") closeNavbar(navbarConfig);

  handleToggle(searchBody, "search-open", "show");
};

// Hàm đóng Search
export const closeSearch = (navbarConfig) => {
  const { searchBody } = navbarConfig;
  handleClose(searchBody, "search-open", "show");
};

// Hàm mở/đóng Dropdown
export const toggleDropdown = (toggle) => {
  if (!toggle) {
    console.warn("toggleDropdown failed: The 'dropdownToggle' element is missing. Make sure the correct element is passed.");
    return;
  }

  const dropdownMenu = toggle.nextElementSibling;
  if (!dropdownMenu) {
    console.warn(
      `toggleDropdown failed: No sibling element found for the dropdown menu. 
      Ensure 'dropdownToggle' has a valid sibling that serves as the dropdown menu.`
    );
    return;
  }

  const isExpanded = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", !isExpanded);
  dropdownMenu.classList.toggle("active", !isExpanded);
};

// Đóng tất cả Dropdowns
export const closeAllDropdowns = (navbarConfig) => {
  const { dropdownToggles } = navbarConfig;

  dropdownToggles.forEach((toggle) => {
    toggle.setAttribute("aria-expanded", "false");
    const menu = toggle.nextElementSibling;
    if (menu) menu.classList.remove("active");
  });
};
