import { createSliderController } from "../slider.controller.js";

export const sliderConfig = () => {
  const config = {
    slider: ".slider",
    slides: ".slider__image",
    prevButton: ".slider__prev-button",
    nextButton: ".slider__next-button",
    autoPlayInterval: 3000,
    swipeThreshold: 50,
  };
  const sliderController = createSliderController(config);
  sliderController.initialize();
};
