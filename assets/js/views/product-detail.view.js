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

  document.querySelector(".product-detail__title").dataset.id = product.id;

  updateRating(product.rating, product.reviews, product.likes);

  updatePrice(product);

  updateColorOptions(product.colors);

  updateSizeOptions(product.sizes);

  updateQuantity();

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
    if (colors.length === 1) {
      // Nếu chỉ có 1 màu, tự động chọn màu đó
      const singleColor = colors[0];
      colorOptionsContainer.innerHTML = `<button class="product-detail__color-option active" data-color="${singleColor}" style="background-color: ${singleColor.toLowerCase()}"></button>`;
      colorOptionsContainer.dataset.selectedColor = singleColor;  // Lưu màu vào dataset
    } else {
      // Nếu có nhiều màu, tạo các button màu để người dùng chọn
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
          colorOptionsContainer.dataset.selectedColor = color;  // Lưu màu vào dataset
        });

        colorOptionsContainer.appendChild(colorButton);
      });
    }
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

      // Đảm bảo khi người dùng chọn size, sẽ có class 'active'
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

// Hàm thêm vào giỏ hàng
function addToCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const quantity = parseInt(document.querySelector(".product-detail__quantity-value").textContent);
  
  // Lấy màu đã chọn từ dataset (hoặc tự động chọn nếu chỉ có 1 màu)
  const selectedColor = document.querySelector(".product-detail__color-options").dataset.selectedColor || "Không chọn";
  
  // Lấy size đã chọn từ các option có class 'active'
  const selectedSizeElement = document.querySelector(".product-detail__size-options .active");

  // Kiểm tra đã chọn size chưa
  if (!selectedSizeElement) {
    alert("Vui lòng chọn size trước khi thêm vào giỏ hàng!");
    return;
  }
  // Kiểm tra đã chọn màu chưa
  if (!selectedColor) {
    alert("Vui lòng chọn màu trước khi thêm vào giỏ hàng!");
    return;
  }
  const selectedSize = selectedSizeElement.value;

  const productId = document.querySelector(".product-detail__title").dataset.id;
  const existingProduct = cart.find((item) => item.id === productId && item.color === selectedColor && item.size === selectedSize);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      name: document.querySelector(".product-detail__title").textContent,
      price: document.querySelector(".product-detail__price-discounted")?.textContent || 
             document.querySelector(".product-detail__price").textContent,
      image: document.querySelector(".product-detail__image").src,
      quantity: quantity,
      color: selectedColor,
      size: selectedSize,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Sản phẩm đã được thêm vào giỏ hàng!");
}



function addActionButtons() {
  const buyNowButton = document.querySelector(".product-detail__buy-now");
  const addToCartButton = document.querySelector(".product-detail__add-to-cart");

  buyNowButton.addEventListener("click", () => {
    alert("Đã mua ngay sản phẩm!");
  });

  addToCartButton.addEventListener("click", () => {
    addToCart();
  });
}

function updateQuantity() {
  const quantityValue = document.querySelector(".product-detail__quantity-value");
  const buttons = document.querySelectorAll(".product-detail__quantity-button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      let currentQuantity = parseInt(quantityValue.textContent) || 1;

      if (button.textContent === "+") {
        currentQuantity++;
      } else if (button.textContent === "-" && currentQuantity > 1) {
        currentQuantity--;
      }

      quantityValue.textContent = currentQuantity;
    });
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
