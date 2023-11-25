import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany();

  return NextResponse.json(products);

  // return NextResponse.json([
  //   { id: 1, name: "Milk", price: 2.5 },
  //   { id: 2, name: "Bread", price: 3.5 },
  //   { id: 3, name: "Meat", price: 4.5 },
  // ]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newProduct = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
    }
  })

  // return NextResponse.json({ id: 10, name: body.name, price: body.price }, { status: 201 });
  return NextResponse.json(newProduct, { status: 201 });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();

  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id: product.id
    },
    data: {
      name: body.name,
      price: body.price
    }
  })

  // return NextResponse.json({ id: 1, name: body.name, price: body.price });
  return NextResponse.json(updatedProduct);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(params.id)
    }
  })

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  await prisma.product.delete({
    where: {
      id: product.id
    }
  })

  return NextResponse.json({});
}
