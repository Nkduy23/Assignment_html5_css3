export const includeHTML = async (file, elementId) => {
  try {
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Failed to load ${file}: ${response.statusText}`);
    }

    const content = await response.text();
    document.getElementById(elementId).innerHTML = content;
  } catch (error) {
    console.error("Error including HTML:", error);
    throw error;
  }
};
