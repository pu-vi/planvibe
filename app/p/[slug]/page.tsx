"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Destination {
  id: number;
  title: string;
  content: string;
  slug: string;
  status: string;
}

export default function PageView() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await fetch(`/api/destinations/view/${slug}`);
        
        if (response.ok) {
          const data = await response.json();
          setDestination(data);
        } else if (response.status === 404) {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching destination:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (notFound || !destination) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-gray-600">The page you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{destination.title}</h1>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: destination.content }}
        />
      </main>
    </div>
  );
}