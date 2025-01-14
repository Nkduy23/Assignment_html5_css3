import { renderSaleProduct, renderRegularProductByCategory } from "./render-product.js";
import { addColorChangeEventListeners } from "./color-change.js";
import { updateProductProgress } from "./progress-update.js";

function loadDataByCategory(category) {
  const categoryData = {
    sale: "json/products-sale.json",
    regular: "json/products-regular.json",
    category1: "json/products-category1.json",
    category2: "json/products-category2.json",
    category3: "json/products-category3.json",
  };

  const containerData = {
    sale: "sale-category",
    regular: "shoes-for-women",
    category1: "balo",
    category2: "shoes-for-men",
    category3: "dep-sandal",
  };

  // Lấy tệp JSON và container ID
  const jsonFile = categoryData[category] || "json/products-main.json";
  console.log(jsonFile);
  
  const containerId = containerData[category] || "default-container";
  console.log(`containerId: ${containerId}`);

  // Lấy container
  const container = document.getElementById(containerId);

  if (container) {
    console.log(`Container found for category "${category}"! Fetching data...`);

    fetch(jsonFile)
      .then((response) => response.json())
      .then((products) => {
        // Ánh xạ các category với hàm render tương ứng
        const renderFunctions = {
          sale: (product) => renderSaleProduct(product, container),
          regular: (product) => renderRegularProductByCategory(product, container),
          category1: (product) => renderRegularProductByCategory(product, container), // Cùng hàm render như regular
          category2: (product) => renderRegularProductByCategory(product, container), // Tương tự
          category3: (product) => renderRegularProductByCategory(product, container), // Tương tự
        };

        // Render sản phẩm theo category
        if (products[`${category}Products`]) {
          products[`${category}Products`].forEach(renderFunctions[category]);
          console.log(`Rendered ${products[`${category}Products`].length} products for category "${category}".`);
          
        } else {
          console.warn(`No products found for category "${category}".`);
        }

        // Gắn sự kiện sau khi render xong
        addColorChangeEventListeners();
        updateProductProgress();
      })
      .catch((error) => console.error("Error loading products:", error));
  } else {
    console.error(`Container element for category "${category}" not found!`);
  }
}

export { loadDataByCategory };
