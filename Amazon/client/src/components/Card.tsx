"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

type CardProps = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  thumbnail: string;
};

const Card = ({ _id, name, description, price, slug, thumbnail }: CardProps) => {
  const router = useRouter();

  const addToWishlist = async () => {
    try {
      const response = await fetch("/api/wishlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: _id }),
      });

      const responseJson: MyResponse<unknown> = await response.json();

      if (!response.ok) {
        let message = responseJson.error ?? "Something went wrong!";
        router.push(`/?error=${message}`);
        return;
      }

      router.push("/wishlist");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      router.push(`/?error=Something went wrong!`);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md w-64 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-4 h-14">{name}</h2>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex w-auto align-center justify-center">
            <Link href={`/products/${slug}`}>
              <img
                src={thumbnail}
                className="align-center object-cover w-44 h-44"
                alt={name}
              />
            </Link>
          </div>
          <p className="text-center mt-2 text-justify h-48">{description}</p>
        </div>
        <div className="mt-2 text-center">
          <p className="text-lg font-bold">${price}</p>
        </div>
      </div>
      <div className="flex justify-around mt-4 gap-2">
        <Link href={`/products/${slug}`} className="bg-blue-500 text-white py-2 px-5 text-sm rounded hover:bg-blue-700">
          Detail
        </Link>
        <button onClick={addToWishlist} className="bg-yellow-500 text-white px-2 py-2 text-sm rounded hover:bg-yellow-700">
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default Card;
