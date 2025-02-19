function createProductHTML(product) {
  const colorOptions = product.colors
    .map(
      (color) => `
        <span class="product-card__color" data-color="${color}" style="background-color: ${color}" aria-describedby="${color}"></span>`
    )
    .join("");

  const saleLabel = product.type === "sale" ? `<div class="product-card__sale-label" data-sale="${product.salePercent}" aria-label="Sale ${product.salePercent}"></div>` : "";

  const progressBar =
    product.type === "sale"
      ? `<div class="product-card__progress" role="progressbar" aria-valuenow="${product.progress}" aria-valuemin="0" aria-valuemax="100" aria-label="Progress bar">
         <span class="product-card__progress-label"> Đã bán ${product.progress}%</span>
         <div class="product-card__progress-bar" style="width: ${product.progress}%" data-progress="${product.progress}"></div>
       </div>`
      : "";

  let discountedPriceHTML = "";
  if (product.type === "sale") {
    const originalPrice = parseInt(product.price.replace(/[^0-9]/g, ""), 10);
    const discount = parseInt(product.salePercent.replace(/[^0-9]/g, ""), 10);
    const discountedPrice = originalPrice * (1 - discount / 100);

    discountedPriceHTML = `
      <p class="product-card__price">
        <span class="product-card__price-original">${product.price}</span>
        <span class="product-card__price-discounted">${discountedPrice.toLocaleString("vi-VN")}đ</span>
      </p>`;
  } else {
    discountedPriceHTML = `<p class="product-card__price-regular">${product.price}</p>`;
  }

  const productPage =
    product.type === "sale" ? `/views/detail/sale-detail.html?id=${product.id}&category=${product.category}` : `/views/detail/product-detail.html?id=${product.id}&category=${product.category}`;

  return `
        <div class="product-card" data-type="${product.type}" aria-label="Product Card">
          <div class="product-card__image-wrapper">
            <a href="${productPage}">
              <img src="${product.images ? product.images.default : product.image}"  
              draggable="true" 
              data-product-id="${product.id}"  
              alt="${product.name}" 
              data-product-price="${product.price}"
              data-product-size="${product.size || 'M'}"
              data-product-color="${Array.isArray(product.colors) ? product.colors[0] : product.colors}" 
              class="product-card__image" data-product-id="${product.id}" />
            </a>
            ${saleLabel}
            <div class="product-card__color-options">
              ${colorOptions}
            </div>
          </div>
          <div class="product-card__info">
            <h3 class="product-card__title">${product.name}</h3>
            ${discountedPriceHTML}
            ${progressBar}
          </div>
        </div>`;
}

export { createProductHTML };
