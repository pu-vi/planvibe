import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, content, bloggerPageId, bloggerUrl, status = 'draft' } = await req.json();

    let slug, canonicalUrl;
    if (bloggerUrl) {
      // Extract slug from blogger URL (e.g., "himachal-pradesh.html")
      const urlParts = bloggerUrl.split('/p/');
      slug = urlParts.length > 1 ? urlParts[1] : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      // Extract canonical URL path (e.g., "/p/himachal-pradesh.html")
      const url = new URL(bloggerUrl);
      canonicalUrl = url.pathname;
    } else {
      slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      canonicalUrl = null;
    }

    // Check if destination already exists by bloggerPageId or slug
    const existing = await prisma.destination.findFirst({
      where: {
        OR: [
          { bloggerPageId },
          { slug }
        ]
      }
    });

    if (existing) {
      // Update existing destination
      const destination = await prisma.destination.update({
        where: { id: existing.id },
        data: {
          title,
          slug,
          content,
          status,
          bloggerPageId,
          bloggerUrl,
          canonicalUrl
        }
      });
      return NextResponse.json(destination);
    } else {
      // Create new destination
      const destination = await prisma.destination.create({
        data: {
          title,
          slug,
          content,
          status,
          bloggerPageId,
          bloggerUrl,
          canonicalUrl
        }
      });
      return NextResponse.json(destination);
    }
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