import { Card, CardContent } from "@/components/ui/card";

export interface Artist {
  id: number;
  name: string;
  category: string;
  location: string;
  priceRange: string;
  bio?: string;
  image?: string;
  languages?: string[];
}

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-2">
        <h3 className="text-lg font-bold">{artist.name}</h3>
        <p className="text-muted-foreground">{artist.category}</p>
        <p className="text-sm">{artist.location}</p>
        <p className="text-sm font-semibold">{artist.priceRange}</p>
        <button className="text-blue-600 hover:underline text-sm">
          Ask for Quote
        </button>
      </CardContent>
    </Card>
  );
}
