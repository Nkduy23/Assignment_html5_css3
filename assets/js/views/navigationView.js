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

// Utility functions
const addEventListenerSafe = (element, event, handler) => {
  if (element) {
    element.addEventListener(event, handler);
  }
};

const toggleState = (element, stateClass, expanded = null) => {
  if (!element) return;
  const isExpanded = expanded !== null ? expanded : element.getAttribute("aria-expanded") === "true";

  element.setAttribute("aria-expanded", expanded !== null ? expanded : !isExpanded);

  if (expanded === false) {
    element.classList.remove(stateClass);
  } else if (expanded === true) {
    element.classList.add(stateClass);
  } else {
    element.classList.toggle(stateClass);
  }
};

// Navbar handling
const setupNavbar = () => {
  const navbarBody = document.querySelector(config.navbar.body);
  const navbarButton = document.querySelector(config.navbar.button);
  const navbarClose = document.querySelector(config.navbar.close);

  const searchBody = document.querySelector(config.search.body);
  const searchButton = document.querySelector(config.search.button);
  const searchClose = document.querySelector(config.search.close);

  const dropdownToggles = document.querySelectorAll(config.dropdown);

  const toggleNavbar = () => {
    document.body.classList.toggle("navbar-open", !navbarBody.classList.contains("show"));
    toggleState(navbarBody, "show");
  };

  const closeNavbar = () => {
    document.body.classList.remove("navbar-open");
    toggleState(navbarBody, "show", false);
  };

  const toggleSearch = () => {
    document.body.classList.toggle("search-open", !searchBody.classList.contains("show"));
    toggleState(searchBody, "show");
  };

  const closeSearch = () => {
    document.body.classList.remove("search-open");
    toggleState(searchBody, "show", false);
  };

  const toggleDropdown = (dropdownToggle) => {
    const dropdownMenu = dropdownToggle.nextElementSibling;
    if (!dropdownMenu) return;

    const expanded = dropdownToggle.getAttribute("aria-expanded") === "true";

    closeAllDropdowns();

    if (expanded) {
      dropdownToggle.setAttribute("aria-expanded", "false");
      dropdownMenu.classList.remove("active");
    } else {
      dropdownToggle.setAttribute("aria-expanded", "true");
      dropdownMenu.classList.add("active");
    }
  };

  const closeAllDropdowns = () => {
    dropdownToggles.forEach((toggle) => {
      toggle.setAttribute("aria-expanded", "false");
      const menu = toggle.nextElementSibling;
      if (menu) {
        menu.classList.remove("active");
      }
    });
  };

  // Event listeners
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
    addEventListenerSafe(toggle, "click", (e) => {
      e.stopPropagation();
      toggleDropdown(toggle);
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(config.navbar.body) && !e.target.closest(config.navbar.button)) {
      closeNavbar();
    }
    if (!e.target.closest(config.search.body) && !e.target.closest(config.search.button)) {
      closeSearch();
    }
    if (!e.target.closest(config.dropdown)) {
      closeAllDropdowns();
    }
  });
};

// Initialize
setupNavbar();
