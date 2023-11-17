import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

/*
GET: getting data
POST: creating data
PUT: updating data
*/

// request: NextRequest  -->  prevent caching

export function GET(request: NextRequest) {
  // fetch users form a db

  // return NextResponse.json("hello");

  return NextResponse.json([
    { id: 1, name: "mahdi" },
    { id: 2, name: "mosh" },
  ]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);

  // return NextResponse.json( body );

  /*
  Validate
  If invalid, return 400
  Else return data (create)
  */
  // if (!body.name) {
  //   return NextResponse.json({ error: "Name is required" }, { status: 400 });
  // }
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}
