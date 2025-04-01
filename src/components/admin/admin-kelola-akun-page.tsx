"use client";

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
import { AllUsers, deleteUserByid } from "@/data/user";
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

interface AdminKelolaAkunPageProps {
  users: AllUsers;
}

const AdminKelolaAkunPage = ({ users }: AdminKelolaAkunPageProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isPending, setIsPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredUsers =
    users?.filter((user) => {
      const formattedDate = new Date(user.createdAt)
        .toISOString()
        .split("T")[0]; // Format "YYYY-MM-DD"

      return (
        user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formattedDate.includes(searchTerm) || // Mencari berdasarkan tanggal
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }) || [];

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleAction = (id: string) => {
    startTransition(() => {
      setIsOpen(true);
      deleteUserByid(id).then((res) => {
        console.log(res);
        if (res.success) {
          setSuccessMessage(res.success);
          setErrorMessage("");
        } else if (res.error) {
          setErrorMessage(res.error);
          setSuccessMessage("");
        }
      });
      setIsOpen(false);
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 10000);
    });
  };

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
          headline="Admin Kelola Akun Travesia"
          tagline="Kelola pengguna travel Travesia"
        />

        {successMessage && (
          <Alert className="mb-4 bg-green-50 border-green-500">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle>Berhasil</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        {errorMessage && (
          <Alert className="mb-4 bg-red-50 border-red-500">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertTitle>Gagal</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <section className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari pengguna..."
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
              Tambah Pengguna
            </Button>
          </div>
          <Table>
            <TableCaption>Daftar pengguna sistem</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Tgl Dibuat</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link
                            className="cursor-pointer"
                            href={`/admin/kelola-user/detail/${user.id}`}
                          >
                            Lihat Pengguna
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Pengguna</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          asChild
                        >
                          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                            <AlertDialogTrigger asChild>
                              <Button
                                className="w-full cursor-pointer rounded-lg"
                                variant="destructive"
                              >
                                Hapus
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Apakah anda yakin ingin menghapus?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tindakan ini akan menghapus pengguna secara
                                  permanen!
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel
                                  className="w-full text-white bg-gray-600"
                                  asChild
                                >
                                  <Button
                                    variant={"default"}
                                    disabled={isPending}
                                  >
                                    {isPending ? "Memuat..." : "Tidak"}
                                  </Button>
                                </AlertDialogCancel>
                                <Button
                                  className="w-full text-white bg-red-600 cursor-pointer hover:text-red-600 hover:bg-white flex gap-2"
                                  onClick={() => handleAction(user.id)}
                                  disabled={isPending}
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

export default AdminKelolaAkunPage;
