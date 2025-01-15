async function includeHTML(file, elementId) {
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

window.addEventListener("DOMContentLoaded", async () => {
  try {
    await includeHTML("view/partials/header.html", "header-placeholder");
    await includeHTML("view/partials/footer.html", "footer-placeholder");

    // Gọi setupNavbar sau khi header và footer đã được chèn
    setupNavbar();
  } catch (error) {
    console.error("Error initializing the app:", error);
  }
});
