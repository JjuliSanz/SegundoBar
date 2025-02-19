"use client";
import { SearchIcon } from "@/assets/icons";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
const SearchBar = ({ placeholder }: { placeholder: string }) => {
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
    <div className="relative flex w-[300px]">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full bg-transparent text-quinto placeholder-quinto border-2 border-quinto rounded-xl pl-10 py-2 focus:outline-none focus:ring-0 focus:bg-quinto focus:text-tercero focus:placeholder-tercero"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <SearchIcon className="absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 text-quinto peer-focus:text-tercero" />
    </div>
  );
};

export default SearchBar;
