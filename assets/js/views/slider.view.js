import { sliderLogic } from "../models/slider.model.js";

export function setupSlider() {
  const config = {
    slider: ".slider",
    slides: ".slider__image",
    prevButton: ".slider__prev-button",
    nextButton: ".slider__next-button",
    autoPlayInterval: 3000,
    swipeThreshold: 50, // Ngưỡng để nhận biết vuốt
  };

  // Utility functions
  const addEventListenerSafe = (element, event, handler) => {
    if (element) {
      element.addEventListener(event, handler);
    }
  };

  const slider = document.querySelector(config.slider);
  const slides = document.querySelectorAll(config.slides);
  const prevButton = document.querySelector(config.prevButton);
  const nextButton = document.querySelector(config.nextButton);
  const totalSlides = slides.length;

  // Quản lý trạng thái
  const state = {
    isSliding: false,
    currentIndex: 0,
    startX: 0,
  };

  const toggleAutoPlay = (start = true) => {
    if (start) {
      state.autoPlayTimer = setInterval(() => {
        sliderLogic.handleSlideChange(1, totalSlides, slider, toggleAutoPlay, state);
      }, config.autoPlayInterval);
    } else {
      clearInterval(state.autoPlayTimer);
      state.autoPlayTimer = null;
    }
  };

  const updateImageSource = () => {
    const isSmallScreen = window.matchMedia("(max-width: 700px)").matches;
    slides.forEach((image) => {
      const newSrc = isSmallScreen ? image.dataset.small : image.dataset.large;
      if (image.src !== newSrc) image.src = newSrc;
    });
  };

  // Gán sự kiện vuốt
  slider.addEventListener("mousedown", (e) => sliderLogic.handleSwipeStart(e, state));
  slider.addEventListener("touchstart", (e) => sliderLogic.handleSwipeStart(e, state));
  slider.addEventListener("mouseup", (e) => sliderLogic.handleSwipeEnd(e, config, totalSlides, slider, toggleAutoPlay, state));
  slider.addEventListener("touchend", (e) => sliderLogic.handleSwipeEnd(e, config, totalSlides, slider, toggleAutoPlay, state));

  // Sự kiện click
  prevButton.addEventListener("click", () => {
    sliderLogic.handleSlideChange(-1, totalSlides, slider, toggleAutoPlay, state);
  });
  nextButton.addEventListener("click", () => {
    sliderLogic.handleSlideChange(1, totalSlides, slider, toggleAutoPlay, state);
  });
  addEventListenerSafe(window, "resize", updateImageSource);

  // Initialize
  slider.style.transform = `translateX(-${state.currentIndex * 100}%)`;
  toggleAutoPlay(true);
}

document.addEventListener("DOMContentLoaded", setupSlider);
