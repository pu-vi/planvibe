"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import RichTextEditor from "../../../../components/RichTextEditor";
import { notify } from "../../../../components/common/notify";

export default function BloggerPageEditor() {
  const params = useParams();
  const bloggerPageId = params.id as string;
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBloggerPage();
  }, [bloggerPageId]);

  const fetchBloggerPage = async () => {
    try {
      const response = await fetch(`/api/blogger/page/${bloggerPageId}`);
      const data = await response.json();
      
      if (response.ok) {
        setTitle(data.title || "");
        setContent(data.content || "");
      } else {
        notify.error("Failed to load page");
      }
    } catch (error) {
      notify.error("Error loading page");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      notify.warning('Please fill in both title and content');
      return;
    }

    try {
      // Save to database
      const dbResponse = await fetch('/api/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          content,
          bloggerPageId,
          status: 'published'
        })
      });

      if (dbResponse.ok) {
        notify.success('Page saved to database successfully!');
        setTimeout(() => window.location.href = '/adm', 1000);
      } else {
        notify.error('Failed to save page to database');
      }
    } catch (error) {
      notify.error('Error saving page');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading page...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Edit Blogger Page</h1>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter page title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <RichTextEditor
                content={content}
                onChange={setContent}
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Save to Database
              </button>
              <a
                href="/adm"
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium transition-colors inline-block"
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