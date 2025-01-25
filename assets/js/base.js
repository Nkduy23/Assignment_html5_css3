export const basePath = window.location.hostname === "nkduy23.github.io" 
  ? "/Assignment_html5_css3" 
  : ".";
  
export const setBasePath = () => {
  const baseTag = document.createElement("base");
  baseTag.href = basePath;
  document.head.appendChild(baseTag);
};
