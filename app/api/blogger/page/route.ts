import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const blogId = process.env.BLOGGER_BLOG_ID;

  if (!apiKey || !blogId) {
    return NextResponse.json(
      { error: "Missing GOOGLE_API_KEY or BLOGGER_BLOG_ID" },
      { status: 500 },
    );
  }

  const maxResults = Number(req.nextUrl.searchParams.get("maxResults")) || 20;
  const pageToken = req.nextUrl.searchParams.get("pageToken") || "";

  let url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/pages?key=${apiKey}&maxResults=${maxResults}`;
  if (pageToken) {
    url += `&pageToken=${pageToken}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Return only the necessary fields for pagination
    return NextResponse.json({
      items: data.items || [],
      nextPageToken: data.nextPageToken || null,
      prevPageToken: data.prevPageToken || null,
      // Blogger API does not provide total count, so totalPages can't be calculated reliably
    });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json(
      { error: "Failed to fetch pages" },
      { status: 500 },
    );
  }
}
