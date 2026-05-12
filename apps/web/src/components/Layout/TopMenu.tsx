"use client";

import { useRouter } from "next/navigation";
import ThemeSwitch from "../Themes/ThemeSwitcher";
import { Search } from "lucide-react";

function debounce<T extends (...args: Any[]) => Any>(fn: T, delay = 300) {
  let timeoutId: Any;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
} /* This functions as, update posts lists every char input 300ms intervals */

export function TopMenu({ query }: { query?: string }) {
  const router = useRouter();

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const search = event.target.value;
      router.push(`/search?q=${search}`);
    },
  );

  // TODO: create and hook the search input to the handleSearch function
  //       make sure you are able to explain what the handleSearch is doing and what debounce does

  return (
    <div className="flex items-center px-12 py-8 border-b border-gray-200 gap-10">
      <form
      onSubmit={(e) => {
        e.preventDefault();
        const queryValue = e.currentTarget.querySelector("input")?.value || "";
        router.push(`/search?q=${queryValue}`);
        }
      } //Prevent user enter from going back to blank search -R
      
       method="GET" className="flex items-center gap-2 border rounded-full border-gray-300 px-4 py-1 hover:border-wsu focus-within:border-wsu w-full ">
        <span ><Search className="text-secondary"/></span>
        <input 
          type="text" 
          placeholder="Search..." 
          onChange={handleSearch} 
          className="w-full focus:outline-none text-secondary"
          defaultValue={query || ""}
        />
      </form>

      <div className="flex ml-auto items-center gap-4 border rounded-full border-gray-300 rounded px-5 py-1 hover:bg-gray-200 hover:text-wsu">
        <ThemeSwitch/>
      </div>
    </div>
  );
}
