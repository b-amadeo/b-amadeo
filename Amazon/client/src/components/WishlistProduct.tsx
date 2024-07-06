"use client";

import React from "react";
import DeleteWishlistButton from "@/components/DeleteWishlistButton";

interface WishlistProductProps {
  item: {
    _id: string;
    products: {
      _id: string;
      name: string;
      slug: string;
      description: string;
      excerpt: string;
      price: number;
      tags: string[];
      thumbnail: string;
      images: string[];
      createdAt: string;
      updatedAt: string;
    };
  };
  onDelete: (wishlistItemId: string) => void;
}

const WishlistProduct = ({ item, onDelete }: WishlistProductProps) => {
  return (
    <div key={item._id} className="flex flex-col md:flex-row mb-4">
      <div className="flex-shrink-0">
        <img
          src={item.products.thumbnail}
          alt="Product Image"
          width={150}
          height={150}
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="md:ml-6 flex-1">
        <h2 className="text-xl font-semibold">{item.products.name}</h2>
        <p className="text-green-600 my-2">In Stock</p>
        <div className="flex flex-wrap space-x-2 mb-4">
          {item.products.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-200 text-gray-800 text-sm font-medium rounded border border-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
        <DeleteWishlistButton wishlistItemId={item._id} onDelete={onDelete} />
      </div>
      <div className="mt-4 md:mt-0 md:ml-auto text-lg font-semibold">
        ${item.products.price}
      </div>
    </div>
  );
};

export default WishlistProduct;
