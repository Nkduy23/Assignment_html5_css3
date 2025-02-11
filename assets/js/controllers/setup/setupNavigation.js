export const setupNavbar = () => {
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

