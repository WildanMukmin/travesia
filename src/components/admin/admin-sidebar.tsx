"use client";

import LogoutButton from "@/components/auth/button-logout";
import { cn } from "@/lib/utils";
import { FileText, Home, MapPin, MessageSquare, Users, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
  onClose?: () => void;
}

const AdminSidebar = ({ onClose }: AdminSidebarProps) => {
  const pathname = usePathname();
  const sidebarItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Kelola Pengguna",
      href: "/admin/kelola-user",
      icon: Users,
    },
    {
      title: "Kelola Destinasi",
      href: "/admin/kelola-destinasi",
      icon: MapPin,
    },
    {
      title: "Kelola Blog",
      href: "/admin/kelola-blog",
      icon: FileText,
    },
    {
      title: "Kelola Forum",
      href: "/admin/kelola-forum",
      icon: MessageSquare,
    },
    // {
    //   title: "Settings",
    //   href: "/admin/settings",
    //   icon: Settings,
    // },
  ];

  return (
    <aside className="h-full w-64 bg-blue-900 text-white flex flex-col fixed md:static z-10">
      {/* Logo with close button for mobile */}
      <div className="flex h-16 items-center justify-between border-b border-blue-700 px-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <Image
            src="/travesia-logo-horizontal.png"
            alt="Logo"
            width={180}
            height={50}
          />
        </Link>

        {/* Close button - only visible on mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-blue-800 md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 ">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-blue-700 text-white"
                    : "hover:bg-blue-800 hover:text-white",
                )}
                onClick={onClose}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="border-t border-blue-700 p-4">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default AdminSidebar;
