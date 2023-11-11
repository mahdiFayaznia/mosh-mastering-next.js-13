import { NextRequest, NextResponse } from "next/server";

export function GET(
  request: NextRequest,
  { params }: { params: { id: number } },
) {
  // Fetch data from a db
  // If not found, return 404
  // Else return data

  if (params.id > 10) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ id: 1, name: "mahdi" });
}

// PUT: replacing an object
// PATCH: updating one or more properties

export function PUT(
  request: NextRequest,
  { params }: { params: { id: number } },
) {}
