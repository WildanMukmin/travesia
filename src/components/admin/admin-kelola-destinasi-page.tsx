"use client";

import { deleteDestinasiById, DestinasiWithOwner } from "@/actions/destinasi";
import AdminHeader from "@/components/admin/admin-header";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import {
  AlertCircle,
  CheckCircle,
  Menu,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react";
import Link from "next/link";
import { startTransition, useState } from "react";

interface DashboardAdminPageProps {
  destinasi: DestinasiWithOwner;
}

const AdminKelolaDestinasiPage = ({ destinasi }: DashboardAdminPageProps) => {
  const [destinasiData, setDestinasiData] =
    useState<DestinasiWithOwner>(destinasi);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // State untuk alert dan dialog
  const [isPending, setIsPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Filter destinasi berdasarkan pencarian
  const filteredDestinasi =
    destinasiData?.filter((dest) => {
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

  // Handle hapus destinasi
  const handleAction = (id: string) => {
    setIsPending(true);
    setIsOpen(true);
    startTransition(() => {
      deleteDestinasiById(id)
        .then((res) => {
          if (res.success) {
            setSuccessMessage(res.success);
            setErrorMessage("");
            setDestinasiData((prevData) =>
              prevData ? prevData.filter((item) => item.id !== id) : [],
            );
          } else if (res.error) {
            setErrorMessage(res.error);
            setSuccessMessage("");
          }
        })
        .finally(() => {
          setIsPending(false); // Pindahkan ke finally agar dieksekusi setelah async selesai
          setIsOpen(false);
        });

      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 10000);
    });
  };

  return (
    <main className="flex h-screen fixed w-full">
      {/* Sidebar */}
      <div
        className={`hidden md:block h-full ${sidebarOpen ? "block" : "hidden"}`}
      >
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Konten Utama */}
      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-12">
        <Button
          className="md:hidden mb-4 p-2 rounded-md bg-blue-800 text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <AdminHeader
          headline="Admin Kelola Destinasi"
          tagline="Kelola data destinasi Travesia"
        />

        {/* Alert Success */}
        {successMessage && (
          <Alert className="mb-4 bg-green-50 border-green-500">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle>Berhasil</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        {/* Alert Error */}
        {errorMessage && (
          <Alert className="mb-4 bg-red-50 border-red-500">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertTitle>Gagal</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

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
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            disabled={isPending}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link
                              className="cursor-pointer"
                              href={`/admin/kelola-destinasi/detail/${dest.id}`}
                            >
                              Lihat Destinasi
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              className="cursor-pointer"
                              href={`/admin/kelola-destinasi/edit/${dest.id}`}
                            >
                              Edit Destinasi
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            asChild
                          >
                            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                              <AlertDialogTrigger asChild>
                                <Button
                                  disabled={isPending}
                                  className="w-full cursor-pointer rounded-lg"
                                  variant="destructive"
                                >
                                  Hapus Destinasi
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Apakah anda yakin ingin menghapus?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tindakan ini akan menghapus destinasi secara
                                    permanen!
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel
                                    className="w-full text-white bg-gray-600"
                                    asChild
                                  >
                                    <Button
                                      disabled={isPending}
                                      variant={"default"}
                                    >
                                      {isPending ? "Memuat..." : "Tidak"}
                                    </Button>
                                  </AlertDialogCancel>
                                  <Button
                                    className="w-full text-white bg-red-600 cursor-pointer hover:text-red-600 hover:bg-white flex gap-2"
                                    disabled={isPending}
                                    onClick={() => handleAction(dest.id)}
                                  >
                                    {isPending ? "Memuat..." : "Ya"}
                                  </Button>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
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
