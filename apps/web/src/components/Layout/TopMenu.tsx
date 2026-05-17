"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ThemeSwitch from "../Themes/ThemeSwitcher";
import { Search } from "lucide-react";
import { FilterBar } from "../Menu/FilterBar";
import { toUrlPath } from "@repo/utils/url";

function debounce<T extends (...args: Any[]) => Any>(fn: T, delay = 300) {
  let timeoutId: Any;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
} /* This functions as, update posts lists every char input 300ms intervals */

export function TopMenu({ query }: { query?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {

      const params = new URLSearchParams(searchParams.toString());
      const search = event.target.value;
      if (search === "") {
        params.delete("urlId");
      } else {
        params.set("urlId", toUrlPath(search));
      }
      router.push(`/shop?${params.toString()}`);
    },
  );

  // TODO: create and hook the search input to the handleSearch function
  //       make sure you are able to explain what the handleSearch is doing and what debounce does

  return (
    <div>
      <div className="flex items-center px-12 bg-[#0D0D0D] py-3  gap-10">
        <img src="/Tsu.png" alt="WSU Logo" className="w-10 h-10" />
        <span ><Search className="text-gray-500" /></span>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          className="w-full focus:outline-none text-secondary transition-colors"
          defaultValue={searchParams.get("urlId") || ""}
        />

        <div className="flex ml-auto items-center gap-4 border rounded-full border-none rounded px-5 py-1 hover:bg-wsu transition-colors">
          <ThemeSwitch />
        </div>
      </div>
      <FilterBar />
    </div>
  );
}
