"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

export default function Searchbar() {
  const [results, setResults] = useState([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(async (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);

    if (term) {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/products?query=${encodeURIComponent(term)}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  }, 300);

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-center">
        <input
          type="text"
          placeholder="Search Amazon"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
          className="p-1 text-black rounded w-96"
        />
      </div>
      <div className="flex w-full justify-center mt-2">
        <ul className="w-96">
          {results.map((product: any) => (
            <li key={product._id} className="p-2 border-b border-gray-300">
              <a href={`/products/${product.slug}`} className="text-white">
                {product.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
