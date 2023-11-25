import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

/*
GET: getting data
POST: creating data
PUT: updating data
*/

// request: NextRequest  -->  prevent caching

export async function GET(request: NextRequest) {
  // fetch users form a db
  // return NextResponse.json("hello");

  // Get all users form db (optional: filter with object)
  // prisma.user.findMany(
  //   {
  //     where:{
  //       email: ""
  //     }
  //   }
  // )

  const users = await prisma.user.findMany();

  // return NextResponse.json([
  //   { id: 1, name: "mahdi" },
  //   { id: 2, name: "mosh" },
  // ]);

  return NextResponse.json(users);
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

  const user = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  })

  if (user) { return NextResponse.json({ error: "User already exists" }, { status: 400 }); }

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    }
  })

  // return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
  return NextResponse.json(newUser, { status: 201 });
}
