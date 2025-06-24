"use client";

import { useEffect, useState } from "react";
import { Artist } from "@/components/artists/ArtistCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  artists: Artist[];
};

export default function DashboardTable({ artists }: Props) {
  const [selected, setSelected] = useState<Artist | null>(null);
  const [editing, setEditing] = useState(false);
  const [localArtists, setLocalArtists] = useState<Artist[]>(artists);

  useEffect(() => {
    setLocalArtists(artists);
  }, [artists]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!selected) return;
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
  };

  const handleSave = () => {
    if (!selected) return;

    const updated = localArtists.map((a) =>
      a.id === selected.id ? selected : a
    );
    setLocalArtists(updated);
    localStorage.setItem("artists", JSON.stringify(updated));
    setEditing(false);
  };

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 font-semibold">Name</th>
            <th className="p-3 font-semibold">Category</th>
            <th className="p-3 font-semibold">Location</th>
            <th className="p-3 font-semibold">Fee</th>
            <th className="p-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {localArtists.map((artist) => (
            <tr key={artist.id} className="border-t">
              <td className="p-3">{artist.name}</td>
              <td className="p-3">{artist.category}</td>
              <td className="p-3">{artist.location}</td>
              <td className="p-3">{artist.priceRange}</td>
              <td className="p-3 flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelected(artist);
                        setEditing(false);
                      }}
                    >
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>
                        {editing ? "Edit Artist" : selected?.name}
                      </DialogTitle>
                    </DialogHeader>

                    {editing ? (
                      <div className="space-y-4">
                        <div>
                          <Label>Name</Label>
                          <Input
                            name="name"
                            value={selected?.name || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <Label>Bio</Label>
                          <Textarea
                            name="bio"
                            value={selected?.bio || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <Label>Category</Label>
                          <Input
                            name="category"
                            value={selected?.category || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <Label>Location</Label>
                          <Input
                            name="location"
                            value={selected?.location || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <Label>Fee</Label>
                          <Input
                            name="priceRange"
                            value={selected?.priceRange || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                          <Button
                            variant="ghost"
                            onClick={() => setEditing(false)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleSave}>Save</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Bio:</strong> {selected?.bio}
                        </p>
                        <p>
                          <strong>Category:</strong> {selected?.category}
                        </p>
                        <p>
                          <strong>Location:</strong> {selected?.location}
                        </p>
                        <p>
                          <strong>Fee:</strong> {selected?.priceRange}
                        </p>
                        <p>
                          <strong>Languages:</strong>{" "}
                          {selected?.languages?.join(", ")}
                        </p>
                        <Button
                          variant="secondary"
                          onClick={() => setEditing(true)}
                        >
                          Edit
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
