"use client";
import { useState } from "react";

interface Page {
  id: string;
  url: string;
  title: string;
}

export default function AdminDashboard() {
  const [pages, setPages] = useState<Page[]>([]);

  const fetchPages = async () => {
    const response = await fetch("/api/blogger");
    const data = await response.json();
    setPages(data.items);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6">
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Posts</h2>
            <p className="text-gray-600">Blogger posts will be listed here</p>
          </section>
          <section className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Pages</h2>
              <div className="flex gap-2">
                <a
                  href="/adm/page"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors inline-block"
                >
                  Add New Page
                </a>
                <button
                  onClick={fetchPages}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Fetch Pages
                </button>
              </div>
            </div>
            {pages && pages.length > 0 ? (
              <ul className="space-y-4">
                {pages.map((page: Page) => (
                  <li key={page.id} className="border-b pb-2">
                    <a
                      href={page.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    >
                      {page.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Blogger pages will be listed here</p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
