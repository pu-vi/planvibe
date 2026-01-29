"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import { notify } from "@/components/common/notify";
import Input from "@/components/ui/Input";

export default function PageEditor() {
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");
  const isEdit = !!blogId;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isEdit) {
      // Load page data for editing
      // TODO: Fetch page data by blogId
    }
  }, [isEdit, blogId]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      notify.warning("Please fill in both title and content");
      return;
    }

    try {
      const method = isEdit ? "PUT" : "POST";
      const body = isEdit ? { id: blogId, title, content } : { title, content };

      const response = await fetch("/api/destinations", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        notify.success(
          isEdit ? "Page updated successfully!" : "Page created successfully!"
        );
        setTimeout(() => (window.location.href = "/adm"), 1000);
      } else {
        notify.error("Failed to save page");
      }
    } catch (error) {
      console.error(error);
      notify.error("Error saving page");
    }
  };

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">
            {isEdit ? "Edit Page" : "Add New Page"}
          </h1>
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
                {isEdit ? "Update" : "Create"} Page
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
