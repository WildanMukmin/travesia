"use client";

import { BlogWithCreator, deleteBlogById } from "@/actions/blog";
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

interface AdminKelolaBlogPageProps {
  blogs: BlogWithCreator;
}

const AdminKelolaBlogPage = ({ blogs }: AdminKelolaBlogPageProps) => {
  const [blogsData, setBlogsData] = useState(blogs);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // State untuk alert dan dialog
  const [isPending, setIsPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredBlogs =
    blogsData?.filter((blog) => {
      const formattedDate = new Date(blog.createdAt)
        .toISOString()
        .split("T")[0]; // Format "YYYY-MM-DD"

      return (
        blog.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formattedDate.includes(searchTerm)
      );
    }) || [];

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Handle hapus blog
  const handleAction = (id: string) => {
    setIsPending(true);
    setIsOpen(true);
    startTransition(() => {
      deleteBlogById(id)
        .then((res) => {
          if (res.success) {
            setSuccessMessage(res.success);
            setErrorMessage("");
            setBlogsData((prevData) =>
              prevData ? prevData.filter((item) => item.id !== id) : [],
            );
            setIsPending(false);
            setIsOpen(false);
          } else if (res.error) {
            setErrorMessage(res.error);
            setSuccessMessage("");
            setIsPending(false);
            setIsOpen(false);
          }
        })
        .finally(() => {
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
        <Button
          className="md:hidden mb-4 p-2 rounded-md bg-blue-800 text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <AdminHeader
          headline="Admin Kelola Blog Travesia"
          tagline="Kelola blog travel Travesia"
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
                placeholder="Cari Blog..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <Link href={"/admin/kelola-blog/add"}>
              <Button disabled={isPending}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Tambah Blog
              </Button>
            </Link>
          </div>
          <Table>
            <TableCaption>Daftar Blog Travesia</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Tgl Dibuat</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBlogs.length > 0 ? (
                paginatedBlogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell className="font-medium">
                      {blog.id.slice(0, 5)}...
                    </TableCell>
                    <TableCell>{blog.user.name}</TableCell>
                    <TableCell>
                      {new Date(blog.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>{blog.title}</TableCell>
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
                              href={`/admin/kelola-blog/detail/${blog.slug}?id=${blog.id}`}
                            >
                              Lihat Blog
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              className="cursor-pointer"
                              href={`/admin/kelola-blog/edit/${blog.id}?userId=${blog.userId}`}
                            >
                              Edit Blog
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
                                  Hapus Blog
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Apakah anda yakin ingin menghapus?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tindakan ini akan menghapus blog secara
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
                                    onClick={() => handleAction(blog.id)}
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
                    Tidak ada blog ditemukan.
                  </TableCell>
                </TableRow>
              )}
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

export default AdminKelolaBlogPage;
