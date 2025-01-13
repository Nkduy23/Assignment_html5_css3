const slider = document.querySelector(".slider");
const sliders = document.querySelectorAll(".slider__image");
const prevBtn = document.querySelector(".slider__prev-btn");
const nextBtn = document.querySelector(".slider__next-btn");
let currentIndex = 0;
const totalSlides = sliders.length;
let autoPlayInterval = null;
let isSliding = false;

// Cập nhập hình ảnh dựa trên kích thước màn hình
function updateImageSource() {
  const isSmallScreen = window.matchMedia("(max-width: 700px)").matches;
  sliders.forEach((image) => {
    const newSrc = isSmallScreen ? image.dataset.small : image.dataset.large;
    if (image.src !== newSrc) image.src = newSrc;
  });
}

// Cập nhập vị trí slider
function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Bất đâu auto play
function startAutoPlay() {
  if (!autoPlayInterval) {
    autoPlayInterval = setInterval(nextSlide, 3000);
  }
}

// Dừng auto play
function stopAutoPlay() {
  clearInterval(autoPlayInterval);
  autoPlayInterval = false;
}

// Chuyển slider trước
function prevSlide() {
  if (isSliding) return;
  isSliding = true;
  stopAutoPlay();

  if (currentIndex === 0) {
    slider.style.transition = "none";
    currentIndex = totalSlides - 1;
  } else {
    slider.style.transition = "transform 0.5s ease";
    currentIndex--;
  }
  updateSlider();

  setTimeout(() => {
    isSliding = false;
  }, 500);

  startAutoPlay();
}

// Chuyển slider tiếp theo
function nextSlide() {
  if (isSliding) return;
  isSliding = true;
  stopAutoPlay();

  if (currentIndex === totalSlides - 1) {
    slider.style.transition = `none`;
    currentIndex = 0;
  } else {
    slider.style.transition = `transform 0.5s ease`;
    currentIndex++;
  }

  updateSlider();
  setTimeout(() => {
    isSliding = false;
  }, 500);

  startAutoPlay();
}

// Sự kiện vuốt chuột và cảm ứng
function handleSwipe(e) {
  const isTouch = e.type.startsWith("touch");
  const start = isTouch ? e.changedTouches[0].screenX : e.clientX;
  let end = start;

  function moveEnd(e) {
    end = isTouch ? e.changedTouches[0].screenX : e.clientX;
    const swipeDistance = start - end;

    if (swipeDistance > 50) {
      nextSlide();
    } else if (swipeDistance < 50) {
      prevSlide();
    }

    if (isTouch) {
      slider.removeEventListener("touchend", moveEnd);
    } else {
      slider.removeEventListener("mouseup", moveEnd);
    }
  }
  if (isTouch) {
    slider.addEventListener("touchend", moveEnd);
  } else {
    slider.addEventListener("mouseup", moveEnd);
  }
}

//Ngăn không cho kéo
sliders.forEach((image) => {
  image.addEventListener("dragstart", (e) => e.preventDefault());
});

// Sự kiện click cho nút prev và next
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// Sự kiện chuột
slider.addEventListener("mousedown", handleSwipe);

// Sự kiện cảm ứng
slider.addEventListener("touchstart", handleSwipe);

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("resize", updateImageSource);
  updateImageSource();
  updateSlider();
  startAutoPlay();
});
