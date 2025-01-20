const sliderLogic = {
  updateSliderPosition: function (slider, currentIndex) {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  },

  toggleAutoPlay: function (autoPlayTimer, start = true, handleSlideChange) {
    if (start) {
      autoPlayTimer = setInterval(() => handleSlideChange(1), 3000);
    } else {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
    return autoPlayTimer;
  },

  handleSlideChange: function (direction, totalSlides, slider, toggleAutoPlay, state) {
    if (state.isSliding) return;
    state.isSliding = true;
    toggleAutoPlay(false);

    // Tính toán chỉ số slide tiếp theo
    state.currentIndex = (state.currentIndex + direction + totalSlides) % totalSlides;
    slider.style.transition = `transform 500ms ease`;
    slider.style.transform = `translateX(-${state.currentIndex * 100}%)`;

    setTimeout(() => {
      state.isSliding = false;
      toggleAutoPlay(true);
    }, 500);
  },

  handleSwipeStart: function (e, state) {
    state.startX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
  },

  handleSwipeEnd: function (e, config, totalSlides, slider, toggleAutoPlay, state) {
    const endX = e.type.includes("touch") ? e.changedTouches[0].clientX : e.clientX;
    const swipeDistance = state.startX - endX;

    if (swipeDistance > config.swipeThreshold) {
      // Vuốt trái
      this.handleSlideChange(1, totalSlides, slider, toggleAutoPlay, state);
    } else if (swipeDistance < -config.swipeThreshold) {
      // Vuốt phải
      this.handleSlideChange(-1, totalSlides, slider, toggleAutoPlay, state);
    }
  },
};

export { sliderLogic };
