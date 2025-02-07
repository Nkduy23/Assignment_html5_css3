import { includeHTML } from "./include-html.util.js";

export async function setupHeaderFooter() {
  await includeHTML("../../components/header.html", "header-placeholder");
  await includeHTML("../../components/footer.html", "footer-placeholder");
}