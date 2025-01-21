// base.js
export const basePath = window.location.hostname === "nkduy23.github.io" 
  ? "/Assignment_html5_css3" 
  : ".";

// Hàm setBasePath có thể giữ nguyên nếu bạn cần thay đổi <base> tag trong document
export const setBasePath = () => {
  const baseTag = document.createElement("base");
  baseTag.href = basePath;
  document.head.appendChild(baseTag);
};
