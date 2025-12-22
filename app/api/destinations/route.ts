import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, content, bloggerPageId, status = 'draft' } = await req.json();

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const destination = await prisma.destination.create({
      data: {
        title,
        slug,
        content,
        status,
        bloggerPageId
      }
    });

    return NextResponse.json(destination);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create destination" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, title, content } = await req.json();

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const destination = await prisma.destination.update({
      where: { id: parseInt(id) },
      data: {
        title,
        slug,
        content
      }
    });

    return NextResponse.json(destination);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update destination" },
      { status: 500 }
    );
  }
}