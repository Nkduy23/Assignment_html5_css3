const getCategoryContainer = (category) => {
  const categoryMap = {
    shoesForWomen: document.querySelector("#shoes-for-women .category-list"),
    bags: document.querySelector("#bags .category-list"),
    shoesForMen: document.querySelector("#shoes-for-men .category-list"),
    DepSandal: document.querySelector("#dep-sandal .category-list"),
  };
  return categoryMap[category] || null;
};

export { getCategoryContainer };