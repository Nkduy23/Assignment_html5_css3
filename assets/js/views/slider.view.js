export const sliderView = (elements) => {
  const updateSlidePosition = (index, enableTransition) => {
    elements.sliderElement.style.transition = enableTransition ? "transform 0.5s ease" : "none";
    elements.sliderElement.style.transform = `translateX(-${index * 100}%)`;
  };

  const updateImageSource = () => {
    const isSmallScreen = window.matchMedia("(max-width: 700px)").matches;
    elements.slides.forEach((image) => {
      const newSrc = isSmallScreen ? image.dataset.small : image.dataset.large;
      if (image.src !== newSrc) image.src = newSrc;
    });
  };

  return {
    updateSlidePosition,
    updateImageSource,
  };
};
