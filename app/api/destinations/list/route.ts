import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const [destinations, total] = await Promise.all([
      prisma.destination.findMany({
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
          updatedAt: true,
        }
      }),
      prisma.destination.count()
    ]);

    return NextResponse.json({
      items: destinations,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch destinations" },
      { status: 500 }
    );
  }
}