export async function includeHTML(file, elementId) {
  const basePath = window.location.hostname === "nkduy23.github.io" 
  ? "/Assignment_html5_css3" 
  : "..";
    try {
      const response = await fetch(`${basePath}/${file}`);
      if (!response.ok) {
        throw new Error(`Failed to load ${file}: ${response.statusText}`);
      }
      const content = await response.text();
      document.getElementById(elementId).innerHTML = content;
    } catch (error) {
      console.error(error.message);
    }
  }
  