import { createSliderModel } from "../models/slider.model.js";
import { createSliderView } from "../views/slider.view.js";

export const createSliderController = (config) => {
  let autoPlayTimer = null;
  let startX = 0; // Lưu giá trị startX để sử dụng trong handleSwipeEnd

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

  // Xử lý chuyển slide
  const handleSlideChange = (direction) => {
    const { index, isLooping, isReverseLooping } = sliderModel.navigateSlide(direction);

    if (isLooping || isReverseLooping) {
      sliderView.updateSlidePosition(index, false); // Tắt transition
      setTimeout(() => {
        sliderView.updateSlidePosition(index, true); // Bật lại transition
      }, 50);
    } else {
      sliderView.updateSlidePosition(index, true);
    }
  };

  const handleSwipeStart = (e) => {
    startX = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleSwipeEnd = (e) => {
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > config.swipeThreshold) {
      const direction = deltaX > 0 ? -1 : 1;
      handleSlideChange(direction);
    }
  };

  const sliderModel = createSliderModel(document.querySelectorAll(config.slides).length, toggleAutoPlay);

  const sliderView = createSliderView(config, handleSlideChange, handleSwipeStart, handleSwipeEnd);

  const initialize = () => {
    sliderView.updateSlidePosition(sliderModel.getCurrentIndex(), true);
    toggleAutoPlay(true);
    sliderView.attachEvents();
  };

  return {
    initialize,
  };
};
