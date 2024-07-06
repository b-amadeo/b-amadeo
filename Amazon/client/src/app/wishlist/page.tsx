"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import WishlistProduct from "@/components/WishlistProduct";

interface WishlistItem {
  _id: string;
  name: string;
  thumbnail?: string;
  tags: string[];
  price: string;
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
}

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch("/api/wishlists", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist items");
        }

        const data = await response.json();
        setWishlistItems(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleDelete = (wishlistItemId: string) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item._id !== wishlistItemId)
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl mt-2 font-bold">Wishlist</h1>
        <hr className="my-3 border-gray-400" />
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <WishlistProduct key={item._id} item={item} onDelete={handleDelete} />
          ))
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold">Your Wishlist is empty.</h2>
            <p className="mt-4 text-gray-600">
              Your Wishlist lives to serve. Give it purpose — fill it with
              groceries, clothing, household supplies, electronics, and more.
            </p>
            <p className="mt-2">
              Continue finding your items on the{" "}
              <Link href="/" className="text-blue-600">
                homepage
              </Link>
              .
            </p>
          </div>
        )}
        {wishlistItems.length > 0 && (
          <>
            <hr className="my-3 border-gray-400" />
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">
                Subtotal ({wishlistItems.length} items): $
                {wishlistItems.reduce(
                  (total, item) => total + item.products.price,
                  0
                )}
              </p>
              <Link
                href="/"
                className="px-6 py-2 text-white bg-yellow-500 rounded-lg shadow hover:bg-yellow-600"
              >
                Back to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Wishlist;
