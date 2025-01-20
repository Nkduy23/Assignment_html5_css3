// utils/setupHeaderFooter.js
import { includeHTML } from "./includeHTML.js";

async function setupHeaderFooter() {
  await includeHTML("../components/header.html", "header-placeholder");
  await includeHTML("../components/footer.html", "footer-placeholder");
}

export { setupHeaderFooter };
