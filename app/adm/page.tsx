"use client";
import ListPages from "../../components/ListPages";

export default function AdminDashboard() {
  const handleAddNew = () => {
    window.location.href = '/adm/page';
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
          <section>
            <h2 className="text-xl font-semibold mb-4">Pages</h2>
            <ListPages onAddNew={handleAddNew} />
          </section>
        </div>
      </main>
    </div>
  );
}
