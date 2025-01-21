import { basePath } from '../base.js'; // Import basePath từ base.js

export async function includeHTML(file, elementId) {
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
