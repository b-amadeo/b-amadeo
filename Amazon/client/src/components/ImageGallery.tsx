"use client";

import React, { useState } from "react";

type ImageGalleryProps = {
  thumbnail: string;
  images: string[];
  name: string;
};

const ImageGallery = ({ thumbnail, images, name }: ImageGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(thumbnail);

  return (
    <div>
      <img
        src={currentImage}
        alt={name}
        width={500}
        height={500}
        className="rounded-lg shadow-lg"
      />
      <div className="flex space-x-2 mt-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product Image ${index + 1}`}
            width={100}
            height={100}
            className="rounded-lg shadow-lg cursor-pointer"
            onClick={() => setCurrentImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
