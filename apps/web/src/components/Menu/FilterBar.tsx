"use client";

import { useRouter, useSearchParams } from "next/navigation";

// https://nextjs.org/docs/app/api-reference/functions/use-search-params 
// TLDR:  (1) params.set(key, value) adds /shop?key=value. params.delete removes
//        (2) Persistent - meaning it replaces/adds/deletes one
export function FilterBar() {

  const router = useRouter();
  const searchParams = useSearchParams();

  function handleOnChange(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "none") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    //Redirect Final Step
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-center px-12 py-3 gap-4 bg-secondary">
      <button className="px-4 py-2 text-textSecondary hover:text-wsu transition-colors"
        onClick={() => handleOnChange("gender", "Women")}
      >
        Women
      </button>
      <button className="px-4 py-2 text-textSecondary hover:text-wsu transition-colors"
        onClick={() => handleOnChange("gender", "Men")}
      >
        Men
      </button>
      <button className="px-4 py-2 text-textSecondary hover:text-wsu transition-colors"
        onClick={() => handleOnChange("gender", "Kids")}
      >
        Kids
      </button>
      <select className="px-4 py-2 text-textSecondary hover:text-wsu transition-colors"
        onChange={(e) => handleOnChange("sort", e.target.value)}
        value={searchParams.get("sort") || "none"}
      >
        <option value="none">Sort by: None</option>
        <option value="Best Reviews">Sort by: Best Reviews</option>
        <option value="Price Ascending">Sort by: Price Ascending</option>
        <option value="Price Descending">Sort by: Price Descending</option>
        <option value="Name Ascending">Sort by: Name Ascending</option>
        <option value="Name Descending">Sort by: Name Descending</option>
      </select>
      <select className="px-4 py-2 text-textSecondary hover:text-wsu transition-colors"
        onChange={(e) => handleOnChange("type", e.target.value)}
      >
        <option value="all">Type: All</option>
        <option value="Pants">Type: Pants</option>
        <option value="T-Shirt">Type: T-Shirts</option>
        <option value="Shorts">Type: Shorts</option>
        <option value="Shoes">Type: Shoes</option>
        <option value="Jacket">Type: Jacket</option>
      </select>
    </div>
  );
}