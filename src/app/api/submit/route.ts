import { NextResponse } from "next/server";

type Artist = {
  name: string;
  bio: string;
  fee: string;
  category: string;
  location?: string;
  languages?: string[];
};

const mockArtistDB: Artist[] = []; // in-memory mock "DB"

export async function POST(req: Request) {
  const data: Artist = await req.json();
  mockArtistDB.push(data);
  console.log("Artist submitted:", data);

  return NextResponse.json(
    { message: "Artist submitted successfully" },
    { status: 201 }
  );
}

export async function GET() {
  return NextResponse.json({ artists: mockArtistDB }, { status: 200 });
}
