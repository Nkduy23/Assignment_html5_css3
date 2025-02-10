export const createSliderView = (config, handleSlideChange, handleSwipeStart, handleSwipeEnd) => {
  const sliderElement = document.querySelector(config.slider);
  const slides = document.querySelectorAll(config.slides);
  const prevButton = document.querySelector(config.prevButton);
  const nextButton = document.querySelector(config.nextButton);

  if (!sliderElement || slides.length === 0 || !prevButton || !nextButton) {
    console.error("Slider elements not found. Check your selectors in config.");
    return;
  }

  const updateSlidePosition = (index, enableTransition) => {
    sliderElement.style.transition = enableTransition ? "transform 0.5s ease" : "none";
    sliderElement.style.transform = `translateX(-${index * 100}%)`;
  };

  const updateImageSource = () => {
    const isSmallScreen = window.matchMedia("(max-width: 700px)").matches;
    slides.forEach((image) => {
      const newSrc = isSmallScreen ? image.dataset.small : image.dataset.large;
      if (image.src !== newSrc) image.src = newSrc;
    });
  };

  const attachEvents = () => {
    prevButton.addEventListener("click", () => handleSlideChange(-1));
    nextButton.addEventListener("click", () => handleSlideChange(1));

    sliderElement.addEventListener("mousedown", handleSwipeStart);
    sliderElement.addEventListener("touchstart", handleSwipeStart);
    sliderElement.addEventListener("mouseup", handleSwipeEnd);
    sliderElement.addEventListener("touchend", handleSwipeEnd);

    window.addEventListener("resize", updateImageSource);
  };

  return {
    updateSlidePosition,
    attachEvents,
  };
};
