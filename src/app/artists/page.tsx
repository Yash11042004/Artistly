"use client";

import { useEffect, useState } from "react";
import ArtistCard, { Artist } from "@/components/artists/ArtistCard";
import Link from "next/link";

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [filtered, setFiltered] = useState<Artist[]>([]);
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    price: "",
  });

  useEffect(() => {
    // Load from localStorage if exists, else fallback to mock file
    const stored = localStorage.getItem("artists");

    if (stored) {
      const localData = JSON.parse(stored);
      setArtists(localData);
      setFiltered(localData);
    } else {
      fetch("/data/artists.json")
        .then((res) => res.json())
        .then((data) => {
          setArtists(data);
          setFiltered(data);
        });
    }
  }, []);

  useEffect(() => {
    const { category, location, price } = filters;
    let temp = [...artists];

    if (category) temp = temp.filter((a) => a.category === category);
    if (location) temp = temp.filter((a) => a.location === location);
    if (price) temp = temp.filter((a) => a.priceRange === price);

    setFiltered(temp);
  }, [filters, artists]);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Browse Artists</h1>
      <Link href="/" className="inline-block mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Home
        </button>
      </Link>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
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
          onChange={(e) =>
            setFilters((f) => ({ ...f, location: e.target.value }))
          }
          className="border p-2 rounded"
        >
          <option value="">All Locations</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
          <option value="San Francisco">San Francisco</option>
        </select>

        <select
          onChange={(e) => setFilters((f) => ({ ...f, price: e.target.value }))}
          className="border p-2 rounded"
        >
          <option value="">All Prices</option>
          <option value="$800 - $1200">$800 - $1200</option>
          <option value="$1000 - $1500">$1000 - $1500</option>
          <option value="$1500 - $2500">$1500 - $2500</option>
          <option value="$2000 - $3000">$2000 - $3000</option>
        </select>
      </div>

      {/* Artist Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </main>
  );
}
