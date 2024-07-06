"use client";

import React, { useState, useEffect, useRef } from "react";
import ProductCards from "@/components/ProductCards";
import { ProductModel } from "@/db/models/product";

const fetchProducts = async (page: number, limit: number): Promise<ProductModel[]> => {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/products?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  };
  

  const ProductsPage = () => {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);
  
    useEffect(() => {
      const loadInitialProducts = async () => {
        setLoading(true);
        try {
          const initialProducts = await fetchProducts(1, 8);
          setProducts(initialProducts);
          setPage(2); // Set page to 2 so that subsequent fetches start from page 2
        } catch (error) {
          console.error("Failed to load initial products", error);
        } finally {
          setLoading(false);
        }
      };
  
      loadInitialProducts();
    }, []);
  
    useEffect(() => {
      if (observer.current) observer.current.disconnect();
  
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
  
      if (observer.current && document.querySelector("#load-more-trigger")) {
        observer.current.observe(document.querySelector("#load-more-trigger")!);
      }
  
      return () => {
        if (observer.current) observer.current.disconnect();
      };
    }, [observer.current]);
  
    useEffect(() => {
      const loadMoreProducts = async () => {
        if (page === 1) return;
  
        setLoading(true);
        try {
          const newProducts = await fetchProducts(page, 8);
          setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        } catch (error) {
          console.error("Failed to load more products", error);
        } finally {
          setLoading(false);
        }
      };
  
      loadMoreProducts();
    }, [page]);
  
    return (
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>
        <ProductCards initialProducts={products} />
        <div id="load-more-trigger" style={{ height: '20px' }} />
        {loading && <p>Loading more products...</p>}
      </div>
    );
  };
  
  export default ProductsPage;
