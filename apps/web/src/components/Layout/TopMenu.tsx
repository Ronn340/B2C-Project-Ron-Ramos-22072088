"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ThemeSwitch from "../Themes/ThemeSwitcher";
import { Search } from "lucide-react";
import { FilterBar } from "../Menu/FilterBar";
import { toUrlPath } from "@repo/utils/url";
import { ShoppingCart, User, History } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

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
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false)

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
  const handleHome = () => {
    router.push(`/`);
  }
  const handleCart = () => {
    router.push(`/cart`);
  }

  // TODO: create and hook the search input to the handleSearch function
  //       make sure you are able to explain what the handleSearch is doing and what debounce does

  return (
    <div>
      <div className="flex items-center px-12 bg-[#0D0D0D] py-3  gap-5">
        <img src="/Tsu.png" alt="WSU Logo" className="w-10 h-10"
          onClick={handleHome}
        />
        <span ><Search className="text-gray-500" /></span>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          className="w-full focus:outline-none text-secondary transition-colors"
          defaultValue={searchParams.get("urlId") || ""}
        />

        <div className="flex mr-auto items-center gap-10">
          <div className="relative flex items-center">
            {/* Profile button toggleable */}
            <button onClick={() => setOpen(!open)}>
              {status === "authenticated"
                ? <img src={session?.user?.image ?? "./noProfile.jpg"} 
                data-test-id="user-image" className="border-2 w-20 border-[#F5E8D8] hover:border-wsu rounded-full object-cover" />
                : <User data-test-id="user-icon" className="w-10 text-[#F5E8D8] hover:text-wsu" />
              }
            </button>

            {/* selection menu ON TOP */}
            {open && (
              <div className="absolute top-full mt-2 w-48 bg-white shadow-lg z-99 p-2 rounded">
                {session ? (
                  <>
                    <p className="text-sm text-secondary px-2 pb-2">{session.user?.email}</p>
                    <button
                      className="w-full text-left px-2 py-1 hover:bg-gray-100"
                      onClick={() => signOut()}
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <button
                    className="flex items-center w-full text-left px-2 py-1 hover:bg-gray-100"
                    onClick={() => signIn("google")}
                  >
                    Sign in with Google
                    <img src="/goooglelogo.jpg" alt="Google Logo" className="w-5 h-5 inline ml-2" />
                  </button>
                )}
              </div>
            )}
          </div>
          <ShoppingCart className="w-10 text-[#F5E8D8] hover:text-wsu" onClick={handleCart} />
          <History className="w-10 text-[#F5E8D8] hover:text-wsu" onClick={() => router.push("/orders")} />
          <div className="border rounded-full border-none rounded py-1 hover:bg-wsu transition-colors" >
            <ThemeSwitch />
          </div>
        </div>
      </div>
      <FilterBar />
    </div>
  );
}
