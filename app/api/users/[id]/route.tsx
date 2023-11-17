import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

export function GET(request: NextRequest, { params }: { params: { id: number } }) {
  /*
  Fetch data from a db
  If not found, return 404
  Else return data
  */

  if (params.id > 10) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ id: 1, name: "mahdi" });
}

/*
PUT: replacing an object
PATCH: updating one or more properties
*/

export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
  /*
  Validate the request body
  if invalid, return 400
  Fetch user with the given id
  if doesn't exist, return 404 (not-found)
  Update the user
  Return the updated user
  */

  const body = await request.json();

  const validation = schema.safeParse(body);

  // if (!body.name) {
  //   return NextResponse.json({ error: "Name is required" }, { status: 400 });
  // }
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  if (params.id > 10) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ id: 1, name: body.name });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
  /*
  Fetch user from db
  if not found, return 404
  Delete the user
  return 200
  */

  if (params.id > 10) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({});
}
