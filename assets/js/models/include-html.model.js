export const fetchHTMLContent = async (file) => {
  try {
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Failed to load ${file}: ${response.statusText}`);
    }
    return await response.text(); // Trả về nội dung HTML dưới dạng chuỗi
  } catch (error) {
    console.error("Error fetching HTML content:", error);
    throw error;
  }
};
