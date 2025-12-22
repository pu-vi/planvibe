import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: pageId } = await params;
  const apiKey = process.env.GOOGLE_API_KEY;
  const blogId = process.env.BLOGGER_BLOG_ID;

  if (!apiKey || !blogId) {
    return NextResponse.json(
      { error: "Missing GOOGLE_API_KEY or BLOGGER_BLOG_ID" },
      { status: 500 }
    );
  }

  const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/pages/${pageId}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch page" },
      { status: 500 }
    );
  }
}