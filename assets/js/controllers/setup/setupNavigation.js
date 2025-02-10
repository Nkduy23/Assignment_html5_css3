import { createNavigationView } from "../../views/navigation.view.js";

export const setupNavigation = () => {
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

  return createNavigationView(config);
};
