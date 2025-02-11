export const setupSlider = () => {
  const config = {
    slider: ".slider",
    slides: ".slider__image",
    prevButton: ".slider__prev-button",
    nextButton: ".slider__next-button",
    autoPlayInterval: 3000,
    swipeThreshold: 50,
  };

  const elements = {
    sliderElement: document.querySelector(config.slider),
    slides: document.querySelectorAll(config.slides),
    prevButton: document.querySelector(config.prevButton),
    nextButton: document.querySelector(config.nextButton),
  };

  return { config, elements };
};
