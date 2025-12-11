"use client";

import { Input } from "@/components/ui/input";

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ query, setQuery, placeholder }: SearchBarProps) {
  return (
    <div className="w-full md:w-1/3 mb-4">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="bg-[#111] text-white border-[#333]"
      />
    </div>
  );
}