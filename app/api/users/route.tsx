import { NextRequest, NextResponse } from "next/server";

// request: NextRequest  -->  prevent caching
export function GET(request: NextRequest) {
  return NextResponse.json([
    { id: 1, name: "mahdi" },
    { id: 2, name: "mosh" },
  ]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Validate
  // If invalid, return 400
  // Else return data
  if (!body.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}
