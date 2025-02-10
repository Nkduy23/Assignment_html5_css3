export const fetchData = async (jsonFile) => {
  try {
    const response = await fetch(jsonFile);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${jsonFile}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error); // Log lỗi ra console
    throw error; // Ném lại lỗi để xử lý tiếp ở cấp trên
  }
};
