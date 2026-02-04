"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import { notify } from "@/components/common/notify";
import Input from "@/components/ui/Input";

export default function BloggerPageEditor() {
  const params = useParams();
  const bloggerPageId = params.id as string;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBloggerPage = async () => {
      try {
        const response = await fetch(`/api/blogger/page/${bloggerPageId}`);
        const data = await response.json();

        if (response.ok) {
          setTitle(data.title || "");
          setContent(data.content || "");
          setBlogUrl(data.url || "");
        } else {
          notify.error("Failed to load page");
        }
      } catch (error) {
        console.error("Error fetching blogger page:", error);
        notify.error("Error loading page");
      } finally {
        setLoading(false);
      }
    };

    fetchBloggerPage();
  }, [bloggerPageId]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      notify.warning("Please fill in both title and content");
      return;
    }

    try {
      // Save to database
      const dbResponse = await fetch("/api/destinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          bloggerPageId,
          bloggerUrl: blogUrl,
          status: "published"
        })
      });

      if (dbResponse.ok) {
        notify.success("Page saved to database successfully!");
        setTimeout(() => (window.location.href = "/adm"), 1000);
      } else {
        notify.error("Failed to save page to database");
      }
    } catch (error) {
      console.error("Error saving page:", error);
      notify.error("Error saving page");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading page...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Edit Blogger Page</h1>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="rounded-lg shadow p-6">
          <div className="space-y-4">
            <Input
              label="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter page title"
            />
            <Input
              label="Blog Page URL"
              type="url"
              value={blogUrl}
              readOnly
              className=""
            />
            <div>
              <label className="block text-sm font-medium mb-2">
                Content
              </label>
              <RichTextEditor content={content} onChange={setContent} />
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-[#007BFF] hover:bg-[#0056B3] text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Save to Database
              </button>
              <a
                href="/adm"
                className="bg-gray-200 hover:bg-gray-300 text-[#212529] px-6 py-2 rounded-md font-medium transition-colors inline-block"
              >
                Cancel
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
