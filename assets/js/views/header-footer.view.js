export const renderHTMLContent = (content, elementId) => {
    try {
      const targetElement = document.getElementById(elementId);
      if (!targetElement) {
        throw new Error(`Element with ID "${elementId}" not found.`);
      }
      targetElement.innerHTML = content; // Gắn nội dung HTML vào DOM
    } catch (error) {
      console.error("Error rendering HTML content:", error);
      throw error;
    }
  };
  