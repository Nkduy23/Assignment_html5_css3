import { setupSlider } from "./setup/setupSlider.js";
import { sliderModel } from "../models/slider.model.js";
import { sliderView } from "../views/slider.view.js";

export const sliderController = () => {
  const { config, elements } = setupSlider();
  let autoPlayTimer = null;
  let startX = 0;

  const attachEvents = () => {
    elements.prevButton.addEventListener("click", () => handleSlideChange(-1));
    elements.nextButton.addEventListener("click", () => handleSlideChange(1));

    elements.sliderElement.addEventListener("mousedown", handleSwipeStart);
    elements.sliderElement.addEventListener("touchstart", handleSwipeStart);
    elements.sliderElement.addEventListener("mouseup", handleSwipeEnd);
    elements.sliderElement.addEventListener("touchend", handleSwipeEnd);

    window.addEventListener("resize", view.updateImageSource);
  };

  const toggleAutoPlay = (start = true) => {
    if (start) {
      autoPlayTimer = setInterval(() => {
        handleSlideChange(1);
      }, config.autoPlayInterval);
    } else {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  };

  const handleSlideChange = (direction) => {
    // Tạo biến và gọi hàm từ model truyền direction
    const { index, isLooping, isReverseLooping } = model.navigateSlide(direction);

    // Của hàm từ view truyền index và enableTransition
    if (isLooping || isReverseLooping) {
      view.updateSlidePosition(index, false);
      setTimeout(() => {
        view.updateSlidePosition(index, true);
      }, 50);
    } else {
      view.updateSlidePosition(index, true);
    }
  };

  // Hàm xuất hành khi người dùng tương tác
  const handleSwipeStart = (e) => {
    startX = e.touches ? e.touches[0].clientX : e.clientX;
  };

  // Hàm tính deltaX vị trí từ lúc chạm đến lúc thả ra tính độ dài
  const handleSwipeEnd = (e) => {
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > config.swipeThreshold) {
      const direction = deltaX > 0 ? -1 : 1;
      handleSlideChange(direction);
    }
  };

  const model = sliderModel(elements.slides.length, toggleAutoPlay);
  const view = sliderView(elements);

  const init = () => {
    attachEvents();
    toggleAutoPlay(true);
  };

  return { init };
};
