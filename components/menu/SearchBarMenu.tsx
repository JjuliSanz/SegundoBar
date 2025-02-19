"use client";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const SearchBarMenu = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isTyping, setIsTyping] = useState(false);

  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    const params = new URLSearchParams(searchParams.toString());
    setIsTyping(searchTerm.trim() !== ""); // Chek if the input value is not empty after triming
    if (searchTerm) {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);
  return (
    <div className="relative flex w-[300px] sm:w-[400px] z-10">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full bg-segundo text-lg sm:text-2xl font-medium text-quinto placeholder-quinto border-2 border-quinto rounded-xl pl-10 py-2 transition duration-300 ease-in-out focus:outline-none focus:ring-0 focus:bg-quinto focus:text-segundo focus:placeholder-segundo"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <SearchIcon className="absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 text-quinto peer-focus:text-segundo" />
    </div>
  );
};

export default SearchBarMenu;
