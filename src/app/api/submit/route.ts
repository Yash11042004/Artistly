import { NextResponse } from "next/server";

const mockArtistDB: any[] = []; // in-memory mock "DB"

export async function POST(req: Request) {
  const data = await req.json();
  mockArtistDB.push(data); // store it temporarily
  console.log("Artist submitted:", data);
  return NextResponse.json(
    { message: "Artist submitted successfully" },
    { status: 201 }
  );
}

export async function GET() {
  return NextResponse.json({ artists: mockArtistDB }, { status: 200 });
}
