import { useState } from "react";
import { X } from "lucide-react"; // or use an SVG/icon

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center bg-white border border-black rounded-full px-4 py-2 w-full  shadow-sm">
      <input
        type="text"
        placeholder="search here"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 outline-none bg-transparent text-black placeholder-gray-400"
      />
      {query && (
        <button onClick={() => setQuery("")} className="ml-2 text-black">
          <X size={18} />
        </button>
      )}
    </div>
  );
}
