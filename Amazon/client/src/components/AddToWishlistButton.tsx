"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ObjectId } from "mongodb";

interface AddToWishlistButtonProps {
  productId: ObjectId;
  slug: string;
}

const AddToWishlistButton = ({ productId, slug }: AddToWishlistButtonProps) => {
  const router = useRouter();

  const handleAddToWishlist = async () => {
    try {
      const response = await fetch("/api/wishlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      const responseJson = await response.json();

      if (!response.ok) {
        let message = responseJson.error ?? "Something went wrong!";
        router.push(`/products/${slug}?error=${message}`);
        return;
      }

      router.push("/wishlist");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      router.push(`/products/${slug}?error=Something went wrong!`);
    }
  };

  return (
    <button
      onClick={handleAddToWishlist}
      className="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded-lg shadow hover:bg-yellow-600"
    >
      Add to Wishlist
    </button>
  );
};

export default AddToWishlistButton;
