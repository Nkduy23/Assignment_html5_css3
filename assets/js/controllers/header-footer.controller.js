import { fetchHTMLContent } from "../models/include-html.model.js";
import { renderHTMLContent } from "../views/header-footer.view.js";

const includeHTML = async (file, elementId) => {
  try {
    const content = await fetchHTMLContent(file);
    renderHTMLContent(content, elementId);
  } catch (error) {
    console.error("Error including HTML in controller:", error);
  }
};

export const setupHeaderFooter = async () => {
  try {
    await includeHTML("../../components/header.html", "header-placeholder");
    await includeHTML("../../components/footer.html", "footer-placeholder");
  } catch (error) {
    console.error("Error setting up header and footer:", error);
  }
};