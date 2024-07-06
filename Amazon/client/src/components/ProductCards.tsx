"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import { ProductModel } from "@/db/models/product";

const ProductCards = ({ initialProducts }: { initialProducts: ProductModel[] }) => {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);

  const loadMoreProducts = async () => {
    setLoading(true);
    const response = await fetch(`/api/products?page=${products.length / 8 + 1}&limit=8`);
    const newProducts = await response.json();
    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    setLoading(false);
  };

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {products?.map((product) => (
        <Card
          key={product._id}
          _id={product._id}
          name={product.name}
          slug={product.slug}
          description={product.description}
          price={product.price}
          thumbnail={product.thumbnail}
        />
      ))}
    </div>
  );
};

export default ProductCards;
