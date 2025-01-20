export async function includeHTML(file, elementId) {
    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`Failed to load ${file}: ${response.statusText}`);
      }
      const content = await response.text();
      document.getElementById(elementId).innerHTML = content;
    } catch (error) {
      console.error(error.message);
    }
  }
  