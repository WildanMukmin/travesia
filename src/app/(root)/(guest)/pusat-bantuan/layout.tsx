"use client";

import { User, MessageSquare, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Mendapatkan path aktif saat ini
  const isActive = (path: string) => pathname === path;
  console.log(pathname);
  const categories = [
    {
      id: 1,
      title: "Kelola Akun",
      icon: <User className="h-5 w-5" />,
      path: "/pusat-bantuan/kelola-akun",
    },
    {
      id: 2,
      title: "Akses Destinasi & Reservasi",
      icon: <MapPin className="h-5 w-5" />,
      path: "/pusat-bantuan/akses-destinasi",
    },
    {
      id: 3,
      title: "Forum Komunitas & Blog",
      icon: <MessageSquare className="h-5 w-5" />,
      path: "/pusat-bantuan/forum-komunitas",
    },
    {
      id: 4,
      title: "Kelola Destinasi",
      icon: <MapPin className="h-5 w-5" />,
      path: "/pusat-bantuan/kelola-destinasi",
    },
  ];
  return (
    <main>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 max-w-4xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Pusat Bantuan Travesia
        </h1>
      </header>

      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200">
          <nav className="flex flex-col p-4 gap-1">
            {categories.map((category) => (
              <Link href={category.path} key={category.id}>
                <Button
                  className={`flex w-full ${isActive(category.path) ? "bg-blue-500 text-white" : ""}`}
                >
                  <span className="mr-2">{category.icon}</span>
                  <span className="text-sm font-medium">{category.title}</span>
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Content */}
          {children}
        </div>
      </div>
    </main>
  );
}
