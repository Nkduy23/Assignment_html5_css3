// navigation.controller.js
import { toggleNavbar, closeNavbar, toggleSearch, closeSearch, toggleDropdown, closeAllDropdowns } from "../views/navigation.view.js";

export const navbarController = () => {
  // Điều phối hành động từ View đến các hàm tương ứng
  const handleNavbarToggle = () => toggleNavbar();
  const handleNavbarClose = () => closeNavbar();
  const handleSearchToggle = () => toggleSearch();
  const handleSearchClose = () => closeSearch();

  const handleDropdownToggle = (dropdownToggle) => toggleDropdown(dropdownToggle);
  const handleOutsideClick = (event) => {
    if (!event.target.closest(".nav") && !event.target.closest(".nav__button-bar")) closeNavbar();
    if (!event.target.closest(".header__search") && !event.target.closest(".header__action-button-open")) closeSearch();
    if (!event.target.closest(".dropdown")) closeAllDropdowns();
  };

  return {
    handleNavbarToggle,
    handleNavbarClose,
    handleSearchToggle,
    handleSearchClose,
    handleDropdownToggle,
    handleOutsideClick,
  };
};
