// src/components/manager/ArtistTable.tsx
import { Artist } from "@/components/artists/ArtistCard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type Props = {
  artists: Artist[];
};

export default function ArtistTable({ artists }: Props) {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Fee</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist) => (
            <td className="px-4 py-2">
              <Dialog>
                <DialogTrigger className="text-blue-600 hover:underline">
                  View
                </DialogTrigger>
                <DialogContent>
                  <h2 className="font-bold text-lg mb-2">{artist.name}</h2>
                  <p>
                    <strong>Category:</strong> {artist.category}
                  </p>
                  <p>
                    <strong>Location:</strong> {artist.location}
                  </p>
                  <p>
                    <strong>Fee:</strong> {artist.priceRange}
                  </p>
                  <p>
                    <strong>Bio:</strong> {artist.bio || "N/A"}
                  </p>
                </DialogContent>
              </Dialog>
            </td>
          ))}
        </tbody>
      </table>
    </div>
  );
}
