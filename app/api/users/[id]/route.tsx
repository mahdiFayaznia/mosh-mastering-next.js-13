import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

/*
PUT: replacing an object
PATCH: updating one or more properties
*/

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  /*
  Fetch data from a db
  If not found, return 404
  Else return data
  */

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) }
  })

  // if (params.id > 10)
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // return NextResponse.json({ id: 1, name: "mahdi" });
  return NextResponse.json(user);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) }
  })

  // if (parseInt(params.id) > 10)
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      email: body.email
    }
  })

  // return NextResponse.json({ id: 1, name: body.name });
  return NextResponse.json(updatedUser);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  /*
  Fetch user from db
  if not found, return 404
  Delete the user
  return 200
  */

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id)
    }
  })

  // if (parseInt(params.id) > 10)
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await prisma.user.delete({
    where: {
      id: user.id
    }
  })

  return NextResponse.json({});
}
