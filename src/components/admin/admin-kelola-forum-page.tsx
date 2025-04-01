"use client";

import { AllForum } from "@/actions/forum";
import AdminHeader from "@/components/admin/admin-header";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Menu, MoreHorizontal, PlusCircle, Search } from "lucide-react";
import { useState } from "react";

interface AdminKelolaForumPageProps {
  forums: AllForum;
}

const AdminKelolaForumPage = ({ forums }: AdminKelolaForumPageProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUsers =
    forums?.filter((forum) => {
      const formattedDate = new Date(forum.createdAt)
        .toISOString()
        .split("T")[0]; // Format "YYYY-MM-DD"

      return (
        forum.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        forum.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        forum.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formattedDate.includes(searchTerm)
      );
    }) || [];

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="flex h-screen">
      <div
        className={`hidden md:block h-full ${sidebarOpen ? "block" : "hidden"}`}
      >
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-12">
        <button
          className="md:hidden mb-4 p-2 rounded-md bg-blue-800 text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </button>

        <AdminHeader
          headline="Admin Kelola Forum Travesia"
          tagline="Kelola Forum travel Travesia"
        />

        <section className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari Forum..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah Forum
            </Button>
          </div>
          <Table>
            <TableCaption>Daftar Forum Travesia</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Tgl Dibuat</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((forum) => (
                <TableRow key={forum.id}>
                  <TableCell className="font-medium">
                    {forum.id.slice(0, 5)}...
                  </TableCell>
                  <TableCell>{forum.user.name}</TableCell>
                  <TableCell>
                    {new Date(forum.createdAt).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{forum.content}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem>Lihat Postingan</DropdownMenuItem>
                        <DropdownMenuItem>Edit Postingan</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Hapus Postingan
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default AdminKelolaForumPage;
