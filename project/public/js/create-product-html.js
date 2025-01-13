function createProductHTML(product) {
  const colorOptions = product.colors
    //map(): Duyệt qua từng phần tử trong mảng để tạo chuỗi HTML tương ứng.
    .map(
      (color) => `
          <span class="product-card__color" data-color="${color}" style="background-color: ${color}" aria-describedby="${color}"></span>`
    )
    //join(""): Kết hợp các chuỗi HTML từ map() thành một chuỗi duy nhất.
    .join("");

  const saleLabel = product.type === "sale" ? `<div class="product-card__sale-label" data-sale="${product.salePercent}" aria-label="Sale ${product.salePercent}"></div>` : "";

  const progressBar =
    product.type === "sale"
      ? `<div class="product-card__progress" role="progressbar" aria-valuenow="${product.progress}" aria-valuemin="0" aria-valuemax="100" aria-label="Progress bar">
              <span class="product-card__progress-label"> Đã bán ${product.progress}</span>
             <div class="product-card__progress-bar" style="width: ${product.progress}%" data-progress="${product.progress}"></div>
           </div>`
      : "";

  return `
        <div class="product-card" data-type="${product.type}" aria-label="Product Card">
          <div class="product-card__image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="product-card__image" data-product-id="${product.id}" />
            ${saleLabel}
            <div class="product-card__color-options">
              ${colorOptions}
            </div>
          </div>
          <div class="product-card__info">
            <h3 class="product-card__title">${product.name}</h3>
            <p class="product-card__price">${product.price}</p>
            ${progressBar}
          </div>
        </div>`;
}

export { createProductHTML };
