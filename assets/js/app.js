import { setupHeaderFooter } from "./utils/setupHeaderFooter.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await setupHeaderFooter();
    setupNavbar();
  } catch (error) {
    console.error("Error loading header and footer:", error);
  }
});
