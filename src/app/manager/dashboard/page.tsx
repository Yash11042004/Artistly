"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardTable from "@/components/manager/DashboardTable";
import { Artist } from "@/components/artists/ArtistCard";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type ArtistRaw = {
  name: string;
  bio?: string;
  categories?: string[];
  category?: string;
  fee?: string;
  location?: string;
  languages?: string[];
};

export default function ManagerDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [filters, setFilters] = useState({ category: "", sort: "" });

  //  To Check login
  useEffect(() => {
    const loggedIn = localStorage.getItem("artistly-logged-in");
    if (loggedIn !== "true") {
      toast.error("You must be logged in to view the dashboard");
      router.replace("/manager/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  // To Load artists
  useEffect(() => {
    if (loading) return;

    const localArtists = localStorage.getItem("artists");
    if (localArtists) {
      const parsed = JSON.parse(localArtists) as ArtistRaw[];
      const normalized: Artist[] = parsed.map((a, i) => ({
        id: i,
        name: a.name,
        bio: a.bio || "",
        category: Array.isArray(a.categories)
          ? a.categories[0]
          : a.category || "Uncategorized",
        priceRange: a.fee || "0",
        location: a.location || "Unknown",
        languages: a.languages || [],
      }));
      setArtists(normalized);
    } else {
      fetch("/data/artists.json")
        .then((res) => res.json())
        .then((data: Artist[]) => setArtists(data));
    }
  }, [loading]);

  // for Filter & sort
  const filtered = [...artists]
    .filter((a) => !filters.category || a.category === filters.category)
    .sort((a, b) => {
      if (filters.sort === "asc")
        return parseInt(a.priceRange) - parseInt(b.priceRange);
      if (filters.sort === "desc")
        return parseInt(b.priceRange) - parseInt(a.priceRange);
      return 0;
    });

  // To Show spinner while loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        <span className="ml-2 text-gray-600">Checking login...</span>
      </div>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>

      {/*  Home button */}
      <Link href="/" className="inline-block mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Go to Home
        </button>
      </Link>

      <div className="flex flex-wrap gap-4 mb-4">
        <select
          onChange={(e) =>
            setFilters((f) => ({ ...f, category: e.target.value }))
          }
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Singer">Singer</option>
          <option value="DJ">DJ</option>
          <option value="Dancer">Dancer</option>
          <option value="Speaker">Speaker</option>
        </select>

        <select
          onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
          className="border p-2 rounded"
        >
          <option value="">Sort by Fee</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <DashboardTable artists={filtered} />
    </main>
  );
}
