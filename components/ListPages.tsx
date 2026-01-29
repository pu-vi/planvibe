"use client";
import { useState, useEffect } from "react";

interface Page {
  id: string;
  title: string;
  url?: string;
  slug?: string;
  status?: string;
  updatedAt?: string;
}

interface ListPagesProps {
  onAddNew: () => void;
}

export default function ListPages({ onAddNew }: ListPagesProps) {
  const [activeTab, setActiveTab] = useState<"db" | "blogger">("db");
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPages = async (source: "db" | "blogger", page: number = 1) => {
    setLoading(true);
    try {
      const url =
        source === "db"
          ? `/api/destinations/list?page=${page}&limit=10`
          : `/api/blogger/page?maxResults=10`;

      const response = await fetch(url);
      const data = await response.json();

      if (source === "db") {
        setPages(data.items || []);
        setTotalPages(data.totalPages || 1);
      } else {
        setPages(data.items || []);
        setTotalPages(1); // Blogger API doesn't provide pagination info
      }
    } catch (error) {
      console.error("Error fetching pages:", error);
      setPages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages(activeTab, currentPage);
  }, [activeTab, currentPage]);

  const handleTabChange = (tab: "db" | "blogger") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="border-b border-gray-300">
        <div className="flex justify-between items-center p-4">
          <div className="flex space-x-1">
            <button
              onClick={() => handleTabChange("db")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === "db"
                  ? "bg-[#007BFF] text-white"
                  : "text-[#212529] hover:text-gray-700"
              }`}
            >
              Database Pages
            </button>
            <button
              onClick={() => handleTabChange("blogger")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === "blogger"
                  ? "bg-[#007BFF] text-white"
                  : "text-[#212529] hover:text-gray-700"
              }`}
            >
              Blogger Pages
            </button>
          </div>
          <button
            onClick={onAddNew}
            className="bg-[#28A745] hover:bg-[#218838] text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            Add New Page
          </button>
        </div>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : pages.length > 0 ? (
          <>
            <div className="space-y-3">
              {pages.map((page) => (
                <div key={page.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-[#212529]">
                        {page.title}
                      </h3>
                      {activeTab === "db" && page.status && (
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded mt-1 ${
                            page.status === "published"
                              ? "bg-[#28A745] text-white"
                              : "bg-[#FFC107] text-gray-900"
                          }`}
                        >
                          {page.status}
                        </span>
                      )}
                    </div>
                    {activeTab === "db" && (
                      <div className="flex gap-2">
                        <a
                          href={`/p/${page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#007BFF] hover:text-[#0056B3] text-sm"
                        >
                          View
                        </a>
                      </div>
                    )}
                    {activeTab === "blogger" && (
                      <div className="flex gap-2">
                        <a
                          href={`/adm/page/${page.id}`}
                          className="text-[#28A745] hover:text-[#218838] text-sm font-medium"
                        >
                          Edit
                        </a>
                        <a
                          href={page.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#007BFF] hover:text-[#0056B3] text-sm"
                        >
                          View
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {activeTab === "db" && totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-6">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50 border-gray-300 bg-white text-gray-700"
                >
                  Previous
                </button>
                <span className="text-sm text-[#212529]">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50 border-gray-300 bg-white text-gray-700"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">No pages found</div>
        )}
      </div>
    </div>
  );
}

