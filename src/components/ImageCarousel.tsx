import React, { useEffect, useRef, useState } from "react";

interface ImageCarouselProps {
  images: string[];
  interval?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  interval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  const startSlide = () => {
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
  };

  const pauseSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  useEffect(() => {
    startSlide();
    return pauseSlide;
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded shadow-lg"
      onMouseEnter={pauseSlide}
      onMouseLeave={startSlide}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Slide ${idx}`}
            className="w-full flex-shrink-0 object-cover "
          />
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 right-5 transform -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`size-2 md:w-4 md:h-4 rounded-full ${
              currentIndex === idx ? "bg-slate-500" : "bg-white/70"
            } transition`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
