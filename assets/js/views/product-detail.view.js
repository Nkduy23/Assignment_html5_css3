import { getCategoryProducts } from "../models/product.model.js";
import { DEFAULT_SALE_END_TIME, SALE_ENDED_MESSAGE } from "../constants/sale.constants.js";
import { CountdownController } from "../controllers/countdown.controller.js";

// Lấy tham số từ URL (id và category)
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const category = urlParams.get("category");

console.log(productId, category);


// Fetch data từ file JSON
getCategoryProducts(category)
  .then((data) => {
    console.log(data);
    const productKey = `${category}Products`;
    console.log(productKey);
    
    if (data[productKey] && Array.isArray(data[productKey])) {
      const product = data[productKey].find((item) => item.id === productId);
      if (product) {
        updateProductDetails(product);
      } else {
        displayError("Sản phẩm không tồn tại!");
      }
    }
  })
  .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));

// Hàm cập nhật thông tin sản phẩm
function updateProductDetails(product) {
  // Cập nhật tiêu đề và giá
  updateElement(".product-detail__title", product.name);
  // updateElement(".product-detail__price", product.price);

  // Cập nhật đánh giá sao
  updateRating(product.rating, product.reviews, product.likes);

  updatePrice(product);

  // Thêm phần chọn màu sắc từ dữ liệu JSON
  updateColorOptions(product.colors);

  // Thêm phần chọn size từ dữ liệu JSON
  updateSizeOptions(product.sizes);

  // Thêm button mua ngay và thêm vào giỏ hàng
  addActionButtons();

  // Cập nhật hình ảnh chính
  const productImage = product.images.highResolution || product.images.default;
  updateElement(".product-detail__image", productImage, "src");

  // Cập nhật mô tả sản phẩm
  updateElement(".product-detail__description", product.description || "Không có mô tả.");

  // Cập nhật thông số kỹ thuật
  updateSpecifications(product.specifications);

  // Cập nhật tiêu đề chi tiết sản phẩm
  updateElement(".product-detail__detailed-info-title", product.detailed_title);

  // Cập nhật chi tiết sản phẩm
  updateDetails(product.detailed_info);

  // Cập nhật mô tả chi tiết
  updateDescriptions(product.describe);

  // Cập nhật hình ảnh thumbnail
  updateThumbnails(product.thumbnails);
}

function updateRating(rating, reviews, likes) {
  const starContainer = document.querySelector(".product-detail__stars");
  starContainer.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.classList.add("star-icon");

    if (rating >= i) {
      star.innerHTML = "★"; // Sao đầy
    } else if (rating >= i - 0.5) {
      star.innerHTML = "⯪"; // Sao nửa
    } else {
      star.innerHTML = "☆"; // Sao rỗng
    }

    starContainer.appendChild(star);
  }

  updateElement(".product-detail__reviews", `${reviews} đánh giá`);
  updateElement(".product-detail__likes", `${likes} lượt thích`);
}

function updatePrice(product) {
  const priceElement = document.querySelector(".product-detail__price");
  let priceHTML = "";

  // Chuyển đổi giá gốc sang số nguyên để tính toán
  const originalPrice = parseInt(product.price.replace(/[^0-9]/g, ""), 10);

  if (product.type === "sale") {
    const discount = parseInt(product.salePercent.replace(/[^0-9]/g, ""), 10);
    const discountedPrice = originalPrice * (1 - discount / 100);

    // Lấy thời gian kết thúc sale, nếu không có thì dùng mặc định
    const saleEndTime = product.saleEnd || DEFAULT_SALE_END_TIME;
    const now = new Date().getTime();
    const saleEndTimestamp = new Date(saleEndTime).getTime();

    // Nếu sale còn hiệu lực => hiển thị cả 2 giá + bộ đếm thời gian
    if (saleEndTimestamp > now) {
      priceHTML = `
        <p class="product-detail__price">
          <span class="product-detail__price-original">${product.price}</span>
          <span class="product-detail__price-discounted">${discountedPrice.toLocaleString("vi-VN")}đ</span>
        </p>`;
      // startCountdownTimer(saleEndTime, product.price);
      const countdownCtrl = new CountdownController(DEFAULT_SALE_END_TIME, SALE_ENDED_MESSAGE);
      countdownCtrl.start();
    } else {
      // Nếu sale đã hết hạn => chỉ hiển thị giá gốc
      priceHTML = `<p class="product-detail__price">${product.price}</p>`;
    }
  } else {
    // Nếu không có khuyến mãi, hiển thị giá gốc bình thường
    priceHTML = `<p class="product-detail__price">${product.price}</p>`;
  }

  priceElement.innerHTML = priceHTML;
}

// Cập nhật phần lựa chọn màu sắc
function updateColorOptions(colors) {
  const colorOptionsContainer = document.querySelector(".product-detail__color-options");
  colorOptionsContainer.innerHTML = ""; // Xóa nội dung cũ

  if (colors && colors.length > 0) {
    colors.forEach((color) => {
      const colorButton = document.createElement("button");
      colorButton.classList.add("product-detail__color-option");
      colorButton.style.backgroundColor = color.toLowerCase();
      colorButton.setAttribute("data-color", color);
      // colorButton.textContent = color;

      // Thêm sự kiện click để đánh dấu lựa chọn
      colorButton.addEventListener("click", () => {
        // Xóa lớp 'active' khỏi tất cả các button màu sắc
        document.querySelectorAll(".product-detail__color-option").forEach((btn) => {
          btn.classList.remove("active");
        });
        // Thêm lớp 'active' vào button màu sắc được chọn
        colorButton.classList.add("active");
      });

      colorOptionsContainer.appendChild(colorButton);
    });
  } else {
    colorOptionsContainer.innerHTML = "<p>Không có màu sắc.</p>";
  }
}

// Cập nhật phần lựa chọn size
function updateSizeOptions(sizes) {
  const sizeSelect = document.querySelector(".product-detail__size-options");
  sizeSelect.innerHTML = ""; // Xóa nội dung cũ

  if (sizes && sizes.length > 0) {
    sizes.forEach((size) => {
      const sizeOption = document.createElement("option");
      sizeOption.value = size;
      sizeOption.textContent = size;

      // Thêm sự kiện change để đánh dấu lựa chọn
      sizeOption.addEventListener("click", () => {
        // Xóa lớp 'active' khỏi tất cả các option
        document.querySelectorAll(".product-detail__size-options option").forEach((opt) => {
          opt.classList.remove("active");
        });
        // Thêm lớp 'active' vào option được chọn
        sizeOption.classList.add("active");
      });

      sizeSelect.appendChild(sizeOption);
    });
  } else {
    sizeSelect.innerHTML = "<option>Không có size.</option>";
  }
}

// Hàm thêm các button "Mua ngay" và "Thêm vào giỏ hàng"
function addActionButtons() {
  const buyNowButton = document.querySelector(".product-detail__buy-now");
  const addToCartButton = document.querySelector(".product-detail__add-to-cart");

  buyNowButton.addEventListener("click", () => {
    alert("Đã mua ngay sản phẩm!");
    // Logic cho hành động mua ngay
  });

  addToCartButton.addEventListener("click", () => {
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
    // Logic cho hành động thêm vào giỏ hàng
  });
}

// Hàm cập nhật một phần tử
function updateElement(selector, content, attribute = "textContent") {
  const element = document.querySelector(selector);
  if (element) {
    element[attribute] = content;
  }
}

// Hàm cập nhật thông số kỹ thuật
function updateSpecifications(specifications) {
  const specContainer = document.querySelector(".product-detail__specifications");
  specContainer.innerHTML = specifications
    ? Object.entries(specifications)
        .map(([key, value]) => `<li><strong>${key}:</strong> ${Array.isArray(value) ? value.join(", ") : value}</li>`)
        .join("")
    : "<li>Không có thông số kỹ thuật.</li>";
}

// Hàm cập nhật chi tiết sản phẩm
function updateDetails(detailedInfo) {
  const detailedInfoContainer = document.querySelector(".product-detail__detailed-info");
  detailedInfoContainer.innerHTML = detailedInfo
    ? Object.entries(detailedInfo)
        .map(([key, value]) => `<li><strong>${key}:</strong> ${Array.isArray(value) ? value.join(", ") : value}</li>`)
        .join("")
    : "<li>Không có chi tiết sản phẩm.</li>";
}

// Hàm cập nhật mô tả chi tiết
function updateDescriptions(describe) {
  const describeContainer = document.querySelector(".product-detail__detailed-description");
  describeContainer.innerHTML = describe
    ? Object.entries(describe)
        .map(([key, value]) => `<li><strong>${key}:</strong> ${Array.isArray(value) ? value.join(", ") : value}</li>`)
        .join("")
    : "";
}

// Hàm cập nhật hình ảnh thumbnail
function updateThumbnails(thumbnails) {
  const thumbnailsContainer = document.querySelector(".product-detail__thumbnails");
  thumbnailsContainer.innerHTML =
    thumbnails && Array.isArray(thumbnails) ? thumbnails.map((thumb) => `<img src="${thumb}" alt="Thumbnail" class="product-detail__thumbnail" />`).join("") : "<p>Không có hình ảnh thu nhỏ.</p>";

  // Sự kiện hover để đổi ảnh chính
  if (thumbnails) {
    thumbnails.forEach((thumb) => {
      const img = document.querySelector(`.product-detail__thumbnail[src="${thumb}"]`);
      img.addEventListener("mouseover", () => {
        document.querySelector(".product-detail__image").src = thumb;
      });
    });
  }
}

// Hàm hiển thị lỗi
function displayError(message) {
  document.querySelector(".product-detail").innerHTML = `<p>${message}</p>`;
}
