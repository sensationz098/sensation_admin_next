"use client"
import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SearchBar from "../common/SearchBar";

interface CommonType {
  id: string;
  name: string;
  email: string;
  gender?: string;
  image_url?: string;
}

interface DynamicTableProps<T extends CommonType> {
  title: string;
  data: T[];
  ProfileComponent: React.FC<{ data: T }>;
  searchPlaceholder?: string;
}

export default function DynamicTable<T extends CommonType>({
  title,
  data,
  ProfileComponent,
  searchPlaceholder = "Search...",
}: DynamicTableProps<T>) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<T | null>(null);
  const limit = 5;

  const filtered = useMemo(() => {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.email.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, data]);

  const paginated = filtered.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filtered.length / limit);

  return (
    <section className="bg-[#111] text-white p-6 rounded-xl border border-[#333] shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <SearchBar query={query} setQuery={setQuery} placeholder={searchPlaceholder} />
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#333] text-gray-400">
            <th className="p-2">#</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            {paginated.some((i) => i.gender) && <th className="p-2">Gender</th>}
            <th className="p-2 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((item, idx) => (
            <tr key={item.id} className="border-b border-[#222]">
              <td className="p-2">{(page - 1) * limit + idx + 1}</td>
              <td className="p-2">{item.name}</td>
              <td className="p-2 text-gray-400">{item.email}</td>
              {item.gender && <td className="p-2">{item.gender}</td>}
              <td className="p-2 text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setSelected(item)}
                      className="bg-[#00BFFF] text-black hover:bg-[#1E90FF]"
                    >
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#111] border border-[#333] text-white max-w-2xl">
                    {selected && <ProfileComponent data={selected} />}
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="bg-[#222] hover:bg-[#333]"
        >
          Prev
        </Button>
        <span>
          Page {page} / {totalPages}
        </span>
        <Button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="bg-[#222] hover:bg-[#333]"
        >
          Next
        </Button>
      </div>
    </section>
  );
}