"use client";

import { AllForum, deleteForumById } from "@/actions/forum";
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

interface AdminKelolaForumPageProps {
  forums: AllForum;
}

const AdminKelolaForumPage = ({ forums }: AdminKelolaForumPageProps) => {
  const [forumsData, setForumsData] = useState(forums);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // State untuk alert dan dialog
  const [isPending, setIsPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredForums =
    forumsData?.filter((forum) => {
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

  const totalPages = Math.ceil(filteredForums.length / itemsPerPage);
  const paginatedForums = filteredForums.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Handle hapus forum
  const handleAction = (id: string) => {
    setIsPending(true);
    setIsOpen(true);
    startTransition(() => {
      deleteForumById(id)
        .then((res) => {
          if (res.success) {
            setSuccessMessage(res.success);
            setErrorMessage("");
            setForumsData((prevData) =>
              prevData ? prevData.filter((item) => item.id !== id) : [],
            );
          } else if (res.error) {
            setErrorMessage(res.error);
            setSuccessMessage("");
          }
        })
        .finally(() => {
          setIsPending(false);
          setIsOpen(false);
          setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
          }, 10000);
        });
    });
  };

  return (
    <main className="flex h-screen fixed w-full">
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
            <Link href={"/admin/kelola-forum/add"}>
              <Button disabled={isPending}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Tambah Forum
              </Button>
            </Link>
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
              {paginatedForums.length > 0 ? (
                paginatedForums.map((forum) => (
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
                              href={`/admin/kelola-forum/detail/${forum.id}`}
                            >
                              Lihat Postingan
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              className="cursor-pointer"
                              href={`/admin/kelola-forum/edit/${forum.id}`}
                            >
                              Ubah Postingan
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
                                  Hapus Postingan
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Apakah anda yakin ingin menghapus?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tindakan ini akan menghapus postingan forum
                                    secara permanen!
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
                                    onClick={() => handleAction(forum.id)}
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    Tidak ada forum ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  disabled={isPending}
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
