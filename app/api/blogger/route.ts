import { BloggerAPI } from "@/utils/BloggerAPI";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const blogId = process.env.BLOGGER_BLOG_ID;

  if (!apiKey || !blogId) {
    return NextResponse.json(
      { error: "Missing GOOGLE_API_KEY or BLOGGER_BLOG_ID" },
      { status: 500 }
    );
  }

  const bloggerApi = new BloggerAPI(apiKey, blogId);
  const maxResults =
    Number(req.nextUrl.searchParams.get("maxResults")) || 10;

  try {
    const pages = await bloggerApi.getPages(maxResults);
    return NextResponse.json(pages);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: `Failed to fetch pages` },
      { status: 500 }
    );
  }
}
