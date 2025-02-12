import { getCategoryProducts } from "../models/product.model.js";
import { DEFAULT_SALE_END_TIME, SALE_ENDED_MESSAGE } from "../constants/sale.constants.js";
import { CountdownController } from "../controllers/countdown.controller.js";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const category = urlParams.get("category");

function displayError(message) {
  document.querySelector(".product-detail").innerHTML = `<p>${message}</p>`;
}

getCategoryProducts(category)
  .then((data) => {
    console.log(data);
    const productKey = `${category}Products`;

    if (data[productKey] && Array.isArray(data[productKey])) {
      const product = data[productKey].find((item) => item.id === productId);
      if (product) {
        updateProductDetails(product);
      } else {
        displayError("Product not found.");
      }
    }
  })
  .catch((error) => console.error("Error fetching product data:", error));

function updateElement(selector, content, attribute = "textContent") {
  const element = document.querySelector(selector);
  if (element) {
    element[attribute] = content;
  }
}

// Hàm cập nhật thông tin sản phẩm
function updateProductDetails(product) {
  updateElement(".product-detail__title", product.name);

  updateRating(product.rating, product.reviews, product.likes);

  updatePrice(product);

  updateColorOptions(product.colors);

  updateSizeOptions(product.sizes);

  addActionButtons();

  const productImage = product.images.highResolution || product.images.default;
  updateElement(".product-detail__image", productImage, "src");

  updateElement(".product-detail__description", product.description || "Không có mô tả.");

  updateSpecifications(product.specifications);

  updateElement(".product-detail__detailed-info-title", product.detailed_title);

  updateDetails(product.detailed_info);

  updateDescriptions(product.describe);

  updateThumbnails(product.thumbnails);
}

function updateRating(rating, reviews, likes) {
  const starContainer = document.querySelector(".product-detail__stars");
  starContainer.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.classList.add("star-icon");

    if (rating >= i) {
      star.innerHTML = "★";
    } else if (rating >= i - 0.5) {
      star.innerHTML = "⯪";
    } else {
      star.innerHTML = "☆";
    }

    starContainer.appendChild(star);
  }

  updateElement(".product-detail__reviews", `${reviews} đánh giá`);
  updateElement(".product-detail__likes", `${likes} lượt thích`);
}

function updatePrice(product) {
  const priceElement = document.querySelector(".product-detail__price");
  let priceHTML = "";

  const originalPrice = parseInt(product.price.replace(/[^0-9]/g, ""), 10);

  if (product.type === "sale") {
    const discount = parseInt(product.salePercent.replace(/[^0-9]/g, ""), 10);
    const discountedPrice = originalPrice * (1 - discount / 100);
    const saleEndTime = product.saleEnd || DEFAULT_SALE_END_TIME;
    const now = new Date().getTime();
    const saleEndTimestamp = new Date(saleEndTime).getTime();

    if (saleEndTimestamp > now) {
      priceHTML = `
        <p class="product-detail__price">
          <span class="product-detail__price-original">${product.price}</span>
          <span class="product-detail__price-discounted">${discountedPrice.toLocaleString("vi-VN")}đ</span>
        </p>`;
      const countdownCtrl = new CountdownController(DEFAULT_SALE_END_TIME, SALE_ENDED_MESSAGE);
      countdownCtrl.start();
    } else {
      priceHTML = `<p class="product-detail__price">${product.price}</p>`;
    }
  } else {
    priceHTML = `<p class="product-detail__price">${product.price}</p>`;
  }

  priceElement.innerHTML = priceHTML;
}

function updateColorOptions(colors) {
  const colorOptionsContainer = document.querySelector(".product-detail__color-options");
  colorOptionsContainer.innerHTML = "";

  if (colors && colors.length > 0) {
    colors.forEach((color) => {
      const colorButton = document.createElement("button");
      colorButton.classList.add("product-detail__color-option");
      colorButton.style.backgroundColor = color.toLowerCase();
      colorButton.setAttribute("data-color", color);

      colorButton.addEventListener("click", () => {
        document.querySelectorAll(".product-detail__color-option").forEach((btn) => {
          btn.classList.remove("active");
        });
        colorButton.classList.add("active");
      });

      colorOptionsContainer.appendChild(colorButton);
    });
  } else {
    colorOptionsContainer.innerHTML = "<p>Không có màu sắc.</p>";
  }
}

function updateSizeOptions(sizes) {
  const sizeSelect = document.querySelector(".product-detail__size-options");
  sizeSelect.innerHTML = "";

  if (sizes && sizes.length > 0) {
    sizes.forEach((size) => {
      const sizeOption = document.createElement("option");
      sizeOption.value = size;
      sizeOption.textContent = size;

      sizeOption.addEventListener("click", () => {
        document.querySelectorAll(".product-detail__size-options option").forEach((opt) => {
          opt.classList.remove("active");
        });
        sizeOption.classList.add("active");
      });

      sizeSelect.appendChild(sizeOption);
    });
  } else {
    sizeSelect.innerHTML = "<option>Không có size.</option>";
  }
}

function addActionButtons() {
  const buyNowButton = document.querySelector(".product-detail__buy-now");
  const addToCartButton = document.querySelector(".product-detail__add-to-cart");

  buyNowButton.addEventListener("click", () => {
    alert("Đã mua ngay sản phẩm!");
  });

  addToCartButton.addEventListener("click", () => {
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
  });
}

function updateSpecifications(specifications) {
  const specContainer = document.querySelector(".product-detail__specifications");
  specContainer.innerHTML = specifications
    ? Object.entries(specifications)
        .map(([key, value]) => `<li><strong>${key}:</strong> ${Array.isArray(value) ? value.join(", ") : value}</li>`)
        .join("")
    : "<li>Không có thông số kỹ thuật.</li>";
}

function updateDetails(detailedInfo) {
  const detailedInfoContainer = document.querySelector(".product-detail__detailed-info");
  detailedInfoContainer.innerHTML = detailedInfo
    ? Object.entries(detailedInfo)
        .map(([key, value]) => `<li><strong>${key}:</strong> ${Array.isArray(value) ? value.join(", ") : value}</li>`)
        .join("")
    : "<li>Không có chi tiết sản phẩm.</li>";
}

function updateDescriptions(describe) {
  const describeContainer = document.querySelector(".product-detail__detailed-description");
  describeContainer.innerHTML = describe
    ? Object.entries(describe)
        .map(([key, value]) => `<li><strong>${key}:</strong> ${Array.isArray(value) ? value.join(", ") : value}</li>`)
        .join("")
    : "";
}

function updateThumbnails(thumbnails) {
  const thumbnailsContainer = document.querySelector(".product-detail__thumbnails");
  thumbnailsContainer.innerHTML =
    thumbnails && Array.isArray(thumbnails) ? thumbnails.map((thumb) => `<img src="${thumb}" alt="Thumbnail" class="product-detail__thumbnail" />`).join("") : "<p>Không có hình ảnh thu nhỏ.</p>";

  if (thumbnails) {
    thumbnails.forEach((thumb) => {
      const img = document.querySelector(`.product-detail__thumbnail[src="${thumb}"]`);
      img.addEventListener("mouseover", () => {
        document.querySelector(".product-detail__image").src = thumb;
      });
    });
  }
}
