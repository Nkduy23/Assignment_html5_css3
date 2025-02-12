export const sliderModel = (totalSlides, toggleAutoPlay) => {
  let currentIndex = 0;
  let isSliding = false;

  // Hàm chuyển slide
  const navigateSlide = (direction) => {
    if (isSliding) {
      return { index: currentIndex, isLooping: false, isReverseLooping: false };
    }

    isSliding = true;

    const nextIndex = (currentIndex + direction + totalSlides) % totalSlides;

    // Tạm dừng autoplay khi người dùng tương tác
    toggleAutoPlay(false);

    setTimeout(() => {
      isSliding = false;
      toggleAutoPlay(true);
    }, 500); // Thời gian chuyển slide

    const isLooping = nextIndex === 0 && direction > 0; // Điều kiện về slide đầu
    const isReverseLooping = nextIndex === totalSlides - 1 && direction < 0; // Slide cuối

    currentIndex = nextIndex;

    // trả về index và trạng thái "loop"
    return { index: currentIndex, isLooping, isReverseLooping };
  };

  return {
    navigateSlide,
    getCurrentIndex: () => currentIndex,
  };
};
