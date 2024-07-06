"use client";
import React, { useState } from "react";
import Background from "@/assets/background.jpg";
import Background1 from "@/assets/background1.jpg";
import Background2 from "@/assets/background2.jpg";
import Background3 from "@/assets/background3.jpg";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    Background.src,
    Background1.src,
    Background2.src,
    Background3.src,
  ];

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div className="relative w-full h-72 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-white"></div>
      <div className="carousel relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item absolute w-full h-full ${
              index === currentSlide ? "block" : "hidden"
            }`}
          >
            <img src={slide} className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <button className="btn btn-circle" onClick={handlePrevSlide}>
            ❮
          </button>
          <button className="btn btn-circle" onClick={handleNextSlide}>
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
