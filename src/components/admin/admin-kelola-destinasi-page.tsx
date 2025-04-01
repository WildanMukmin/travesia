"use client";

import { DestinasiWithOwner } from "@/actions/destinasi";
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

interface DashboardAdminPageProps {
  destinasi: DestinasiWithOwner;
}

const AdminKelolaDestinasiPage = ({ destinasi }: DashboardAdminPageProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter destinasi berdasarkan pencarian
  const filteredDestinasi =
    destinasi?.filter((dest) => {
      const formattedDate = new Date(dest.createdAt).toLocaleDateString(
        "id-ID",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        },
      );

      return (
        dest.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.namaDestinasi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.alamat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.kategoriLokasi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.nomorOwner?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.owner.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formattedDate.includes(searchTerm)
      );
    }) || [];

  // Paginasi
  const totalPages = Math.ceil(filteredDestinasi.length / itemsPerPage);
  const paginatedDestinasi = filteredDestinasi.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <main className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`hidden md:block h-full ${sidebarOpen ? "block" : "hidden"}`}
      >
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Konten Utama */}
      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-12">
        <button
          className="md:hidden mb-4 p-2 rounded-md bg-blue-800 text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </button>

        <AdminHeader
          headline="Admin Kelola Destinasi"
          tagline="Kelola data destinasi Travesia"
        />

        <section className="mt-4">
          {/* Input Pencarian & Tombol Tambah */}
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari destinasi..."
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
              Tambah Destinasi
            </Button>
          </div>

          {/* Tabel */}
          <Table>
            <TableCaption>Daftar destinasi yang terdaftar</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama Destinasi</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Tgl Dibuat</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDestinasi.length > 0 ? (
                paginatedDestinasi.map((dest) => (
                  <TableRow key={dest.id}>
                    <TableCell className="font-medium">
                      {dest.id.slice(0, 5)}...
                    </TableCell>
                    <TableCell>{dest.namaDestinasi}</TableCell>
                    <TableCell>{dest.alamat}</TableCell>
                    <TableCell>{dest.kategoriLokasi}</TableCell>
                    <TableCell>
                      {new Date(dest.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                          <DropdownMenuItem>Lihat Destinasi</DropdownMenuItem>
                          <DropdownMenuItem>Edit Destinasi</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Hapus Destinasi
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    Tidak ada destinasi ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
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

export default AdminKelolaDestinasiPage;
