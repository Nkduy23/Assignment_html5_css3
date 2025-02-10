// Function to toggle element states
// stateClass = show
export const toggleState = (element, stateClass, expanded = null) => {
  if (!element) {
    console.log("Element is undefined or null. Skipping toggleState.");
    return;
  }
  // Chưa truyền đối số expanded nên mặc định là null hoặc false
  // Nếu = null thì = true ! = false -> so sánh lần 2
  const isExpanded = expanded !== null ? expanded : element.getAttribute("aria-expanded") === "true";
  // Nếu = false đổi aria-expanded = true, ngược lại = false
  element.setAttribute("aria-expanded", expanded !== null ? expanded : !isExpanded);

  // Xử lý class
  if (expanded === false) {
    element.classList.remove(stateClass);
  } else if (expanded === true) {
    element.classList.add(stateClass);
  } else {
    element.classList.toggle(stateClass);
  }
};

export const handleToggle = (element, bodyClass, toggleClass) => {
  if (element) {
    // 1. Kiểm tra xem có tham số 3 không ?
    const isOpen = element.classList.contains(toggleClass);
    // 2. Nếu không thì toggle class = show
    document.body.classList.toggle(bodyClass, !isOpen);
    // 3. Toggle aria-expanded
    // Truyền element và class = show
    toggleState(element, toggleClass);
  } else {
    console.error(`${toggleClass} element not found!`);
  }
};

export const handleClose = (element, bodyClass, closeClass) => {
  if (element) {
    // remove class và remove aria-expanded
    document.body.classList.remove(bodyClass);
    element.classList.remove(closeClass);
    element.setAttribute("aria-expanded", "false");
  } else {
    console.error(`${closeClass} element not found!`);
  }
};
