import { fetchData } from "../utils/fetch-data.util.js";

// Hàm fetch dữ liệu chung
export const getProducts = async (jsonFile) => {
  try {
    const products = await fetchData(jsonFile);
    return products;
  } catch (error) {
    console.error(`Error fetching products from ${jsonFile}:`, error);
    throw error;
  }
};

// Hàm fetch dữ liệu cho trang chủ
export const getHomeProducts = async () => {
  return getProducts("data/home.products.json");
};

// Hàm fetch dữ liệu cho danh mục sản phẩm
export const getCategoryProducts = async (category) => {
  const categoryConfig = {
    sale: "../../data/sale.products.json",
    shoesForWomen: "../../data/womens-shoes.products.json", 
    bags: "../../data/bags.products.json",
    shoesForMen: "../../data/mens-shoes.products.json",
    DepSandal: "../../data/sandals.products.json",
  };

  const jsonFile = categoryConfig[category] || "../../data/home.products.json";
  return getProducts(jsonFile);
};