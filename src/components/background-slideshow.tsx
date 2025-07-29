import { useEffect, useState } from "react";

interface BackgroundSlideshowProps {
  images: string[];
  interval?: number;
}

function BackgroundSlideshow({
  images,
  interval = 4000,
}: BackgroundSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {images.map((image, index) => (
        <div
          key={image}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateX(${(index - currentIndex) * 100}%)`,
            transition: "transform 1s ease-in-out",
          }}
        />
      ))}
    </div>
  );
}

export default BackgroundSlideshow;
