"use client";

import AdminHeader from "@/components/admin/admin-header";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { Menu } from "lucide-react";
import { useState } from "react";
const AdminKelolaBlogPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <main className="flex h-screen">
      <div className={`${sidebarOpen ? "block" : "hidden"} md:block h-full`}>
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto py-4 px-4 md:py-6 md:px-12">
          {/* Mobile menu button */}
          <button
            className="md:hidden mb-4 p-2 rounded-md bg-blue-800 text-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <AdminHeader
            headline="Admin Kelola Blog Travesia"
            tagline="Kelola Blog Travesia"
          />
        </div>

        <section className="container mx-auto py-4 px-4 md:py-6 md:px-12">
          <div className="flex flex-wrap gap-4">kelola Blog</div>
        </section>
      </div>
    </main>
  );
};

export default AdminKelolaBlogPage;
