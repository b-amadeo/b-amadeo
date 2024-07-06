"use client";

import React from "react";

interface DeleteWishlistButtonProps {
  wishlistItemId: string;
  onDelete: (wishlistItemId: string) => void;
}

const DeleteWishlistButton = ({ wishlistItemId, onDelete }: DeleteWishlistButtonProps) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/wishlists`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wishlistItemId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete wishlist item");
      }

      onDelete(wishlistItemId);
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-blue-500"
    >
      Delete
    </button>
  );
};

export default DeleteWishlistButton;
