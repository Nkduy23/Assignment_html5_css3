import { setupNavbar } from "./setup/setupNavigation.js";
import { toggleNavbar, closeNavbar, toggleSearch, closeSearch, toggleDropdown, closeAllDropdowns } from "../views/navigation.view.js";

export const listenToNavbarEvents = () => {
  const navbarConfig = setupNavbar();

  const { navbarBody, searchBody, navbarButton, navbarClose, searchButton, searchClose, dropdownToggles } = navbarConfig;

  const addEventListenerSafe = (element, event, handler) => {
    if (element) {
      element.addEventListener(event, handler);
    } else {
      console.warn(
        `Cannot add '${event}' event: The target element is ${element}. 
         Make sure you passed the correct DOM element.`
      );
    }
  };

  addEventListenerSafe(navbarButton, "click", (e) => {
    e.stopPropagation();
    toggleNavbar(navbarConfig);
  });

  addEventListenerSafe(navbarClose, "click", (e) => {
    e.stopPropagation();
    closeNavbar(navbarConfig);
  });

  addEventListenerSafe(searchButton, "click", (e) => {
    e.stopPropagation();
    toggleSearch(navbarConfig);
  });

  addEventListenerSafe(searchClose, "click", (e) => {
    e.stopPropagation();
    toggleSearch(navbarConfig);
  });

  dropdownToggles.forEach((toggle) => {
    addEventListenerSafe(toggle, "click", (e) => {
      e.stopPropagation();
      toggleDropdown(toggle);
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav") && !e.target.closest(".nav__button-bar")) closeNavbar(navbarConfig);
    if (!e.target.closest(".header__search") && !e.target.closest(".header__action-button-open")) closeSearch(navbarConfig);
    if (!e.target.closest(".dropdown")) closeAllDropdowns(navbarConfig);
  });

  console.log("Events are being listened by the View");
};
