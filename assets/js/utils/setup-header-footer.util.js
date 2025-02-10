import { includeHTML } from "./include-html.util.js";

export const setupHeaderFooter = async () => {
  await includeHTML("../../components/header.html", "header-placeholder");
  await includeHTML("../../components/footer.html", "footer-placeholder");
}