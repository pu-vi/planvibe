"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import "../page.css";

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
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (notFound || !destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
          <p>The page you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">{destination.title}</h1>
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
