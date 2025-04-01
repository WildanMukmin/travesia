"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Users,
  MapPin,
  FileText,
  MessageSquare,
  PlusCircle,
  MoreHorizontal,
  Search,
  Home,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import AdminSidebar from "@/components/admin/admin-sidebar";
import AdminHeader from "@/components/admin/admin-header";
import { AllUsers } from "@/data/user";
import { AllReservasi } from "@/actions/reservasi";
import { AllDestinasi } from "@/actions/destinasi";
import { AllBlog } from "@/actions/blog";
import { AllForum } from "@/actions/forum";

// export default function DashboardAdminPage() {
//   const [bookings, setBookings] = useState([
//     {
//       id: "B001",
//       customer: "Budi Santoso",
//       package: "Paket Wisata Bali 3D2N",
//       startDate: "2025-04-15",
//       endDate: "2025-04-17",
//       status: "Confirmed",
//       payment: "Paid",
//       totalAmount: 4500000,
//     },
//     {
//       id: "B002",
//       customer: "Siti Rahayu",
//       package: "Paket Wisata Yogyakarta 2D1N",
//       startDate: "2025-05-20",
//       endDate: "2025-05-21",
//       status: "Pending",
//       payment: "Unpaid",
//       totalAmount: 2800000,
//     },
//     {
//       id: "B003",
//       customer: "Andi Wijaya",
//       package: "Paket Wisata Lombok 4D3N",
//       startDate: "2025-06-10",
//       endDate: "2025-06-13",
//       status: "Confirmed",
//       payment: "Partially Paid",
//       totalAmount: 5600000,
//     },
//   ]);

//   const [packages, setPackages] = useState([
//     {
//       id: "P001",
//       name: "Paket Wisata Bali 3D2N",
//       destination: "Bali",
//       duration: "3 Hari 2 Malam",
//       price: 4500000,
//       availability: "Available",
//     },
//     {
//       id: "P002",
//       name: "Paket Wisata Yogyakarta 2D1N",
//       destination: "Yogyakarta",
//       duration: "2 Hari 1 Malam",
//       price: 2800000,
//       availability: "Available",
//     },
//     {
//       id: "P003",
//       name: "Paket Wisata Lombok 4D3N",
//       destination: "Lombok",
//       duration: "4 Hari 3 Malam",
//       price: 5600000,
//       availability: "Limited",
//     },
//     {
//       id: "P004",
//       name: "Paket Wisata Raja Ampat 5D4N",
//       destination: "Raja Ampat",
//       duration: "5 Hari 4 Malam",
//       price: 8900000,
//       availability: "Available",
//     },
//   ]);

//   const [users, setUsers] = useState([
//     {
//       id: "U001",
//       name: "Budi Santoso",
//       email: "budi@example.com",
//       phone: "081234567890",
//       role: "Customer",
//       status: "Active",
//     },
//     {
//       id: "U002",
//       name: "Siti Rahayu",
//       email: "siti@example.com",
//       phone: "081298765432",
//       role: "Customer",
//       status: "Active",
//     },
//     {
//       id: "U003",
//       name: "Andi Wijaya",
//       email: "andi@example.com",
//       phone: "081345678901",
//       role: "Customer",
//       status: "Active",
//     },
//     {
//       id: "U004",
//       name: "Admin Travesia",
//       email: "admin@travesia.com",
//       phone: "080012345678",
//       role: "Admin",
//       status: "Active",
//     },
//   ]);

//   const [openAddPackage, setOpenAddPackage] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Stats/Data for Dashboard
//   const totalBookings = bookings.length;
//   const totalPackages = packages.length;
//   const totalUsers = users.length;
//   const totalRevenue = bookings.reduce(
//     (sum, booking) => sum + booking.totalAmount,
//     0
//   );

//   // Dashboard content
//   const renderDashboard = () => (
//     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Total Pemesanan</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{totalBookings}</div>
//           <p className="text-xs text-muted-foreground">Pemesanan aktif</p>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">
//             Total Paket Wisata
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{totalPackages}</div>
//           <p className="text-xs text-muted-foreground">Paket tersedia</p>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{totalUsers}</div>
//           <p className="text-xs text-muted-foreground">Pengguna terdaftar</p>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">
//             Total Pendapatan
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">
//             Rp {totalRevenue.toLocaleString("id-ID")}
//           </div>
//           <p className="text-xs text-muted-foreground">Semua transaksi</p>
//         </CardContent>
//       </Card>
//     </div>
//   );

//   // Bookings content
//   const renderBookings = () => {
//     const filteredBookings = bookings.filter(
//       (booking) =>
//         booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         booking.package.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//       <>
//         <div className="flex justify-between items-center mb-4">
//           <div className="relative w-full max-w-sm">
//             <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Cari pemesanan..."
//               className="pl-8"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <Button>
//             <PlusCircle className="mr-2 h-4 w-4" />
//             Tambah Pemesanan
//           </Button>
//         </div>
//         <Table>
//           <TableCaption>Daftar pemesanan terkini</TableCaption>
//           <TableHeader>
//             <TableRow>
//               <TableHead>ID</TableHead>
//               <TableHead>Pelanggan</TableHead>
//               <TableHead>Paket</TableHead>
//               <TableHead>Tanggal</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Pembayaran</TableHead>
//               <TableHead>Total</TableHead>
//               <TableHead>Aksi</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredBookings.map((booking) => (
//               <TableRow key={booking.id}>
//                 <TableCell className="font-medium">{booking.id}</TableCell>
//                 <TableCell>{booking.customer}</TableCell>
//                 <TableCell>{booking.package}</TableCell>
//                 <TableCell>
//                   {booking.startDate} - {booking.endDate}
//                 </TableCell>
//                 <TableCell>
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       booking.status === "Confirmed"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {booking.status}
//                   </span>
//                 </TableCell>
//                 <TableCell>
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       booking.payment === "Paid"
//                         ? "bg-green-100 text-green-800"
//                         : booking.payment === "Unpaid"
//                           ? "bg-red-100 text-red-800"
//                           : "bg-blue-100 text-blue-800"
//                     }`}
//                   >
//                     {booking.payment}
//                   </span>
//                 </TableCell>
//                 <TableCell>
//                   Rp {booking.totalAmount.toLocaleString("id-ID")}
//                 </TableCell>
//                 <TableCell>
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" className="h-8 w-8 p-0">
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuLabel>Aksi</DropdownMenuLabel>
//                       <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
//                       <DropdownMenuItem>Edit Pemesanan</DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem className="text-red-600">
//                         Batalkan Pemesanan
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </>
//     );
//   };

//   // Packages content
//   const renderPackages = () => {
//     const filteredPackages = packages.filter(
//       (pkg) =>
//         pkg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         pkg.destination.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//       <>
//         <div className="flex justify-between items-center mb-4">
//           <div className="relative w-full max-w-sm">
//             <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Cari paket wisata..."
//               className="pl-8"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <Dialog open={openAddPackage} onOpenChange={setOpenAddPackage}>
//             <DialogTrigger asChild>
//               <Button>
//                 <PlusCircle className="mr-2 h-4 w-4" />
//                 Tambah Paket
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//               <DialogHeader>
//                 <DialogTitle>Tambah Paket Wisata Baru</DialogTitle>
//                 <DialogDescription>
//                   Masukkan detail paket wisata baru. Klik simpan saat selesai.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="name" className="text-right">
//                     Nama
//                   </Label>
//                   <Input
//                     id="name"
//                     placeholder="Nama paket wisata"
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="destination" className="text-right">
//                     Destinasi
//                   </Label>
//                   <Input
//                     id="destination"
//                     placeholder="Destinasi"
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="duration" className="text-right">
//                     Durasi
//                   </Label>
//                   <Input
//                     id="duration"
//                     placeholder="Durasi (contoh: 3 Hari 2 Malam)"
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="price" className="text-right">
//                     Harga
//                   </Label>
//                   <Input
//                     id="price"
//                     type="number"
//                     placeholder="Harga dalam Rupiah"
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="availability" className="text-right">
//                     Ketersediaan
//                   </Label>
//                   <Select>
//                     <SelectTrigger className="col-span-3">
//                       <SelectValue placeholder="Pilih ketersediaan" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="available">Available</SelectItem>
//                       <SelectItem value="limited">Limited</SelectItem>
//                       <SelectItem value="unavailable">Unavailable</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="description" className="text-right">
//                     Deskripsi
//                   </Label>
//                   <Textarea
//                     id="description"
//                     placeholder="Deskripsi paket wisata"
//                     className="col-span-3"
//                   />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button type="submit" onClick={() => setOpenAddPackage(false)}>
//                   Simpan
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//         <Table>
//           <TableCaption>Daftar paket wisata</TableCaption>
//           <TableHeader>
//             <TableRow>
//               <TableHead>ID</TableHead>
//               <TableHead>Nama Paket</TableHead>
//               <TableHead>Destinasi</TableHead>
//               <TableHead>Durasi</TableHead>
//               <TableHead>Harga</TableHead>
//               <TableHead>Ketersediaan</TableHead>
//               <TableHead>Aksi</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredPackages.map((pkg) => (
//               <TableRow key={pkg.id}>
//                 <TableCell className="font-medium">{pkg.id}</TableCell>
//                 <TableCell>{pkg.name}</TableCell>
//                 <TableCell>{pkg.destination}</TableCell>
//                 <TableCell>{pkg.duration}</TableCell>
//                 <TableCell>Rp {pkg.price.toLocaleString("id-ID")}</TableCell>
//                 <TableCell>
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       pkg.availability === "Available"
//                         ? "bg-green-100 text-green-800"
//                         : pkg.availability === "Limited"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {pkg.availability}
//                   </span>
//                 </TableCell>
//                 <TableCell>
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" className="h-8 w-8 p-0">
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuLabel>Aksi</DropdownMenuLabel>
//                       <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
//                       <DropdownMenuItem>Edit Paket</DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem className="text-red-600">
//                         Hapus Paket
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </>
//     );
//   };

//   // Users content
//   const renderUsers = () => {
//     const filteredUsers = users.filter(
//       (user) =>
//         user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//       <>
//         <div className="flex justify-between items-center mb-4">
//           <div className="relative w-full max-w-sm">
//             <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Cari pengguna..."
//               className="pl-8"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <Button>
//             <PlusCircle className="mr-2 h-4 w-4" />
//             Tambah Pengguna
//           </Button>
//         </div>
//         <Table>
//           <TableCaption>Daftar pengguna sistem</TableCaption>
//           <TableHeader>
//             <TableRow>
//               <TableHead>ID</TableHead>
//               <TableHead>Nama</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>No. Telepon</TableHead>
//               <TableHead>Peran</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Aksi</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredUsers.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell className="font-medium">{user.id}</TableCell>
//                 <TableCell>{user.name}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.phone}</TableCell>
//                 <TableCell>{user.role}</TableCell>
//                 <TableCell>
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       user.status === "Active"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {user.status}
//                   </span>
//                 </TableCell>
//                 <TableCell>
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" className="h-8 w-8 p-0">
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuLabel>Aksi</DropdownMenuLabel>
//                       <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
//                       <DropdownMenuItem>Edit Pengguna</DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem className="text-red-600">
//                         Nonaktifkan Pengguna
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </>
//     );
//   };

//   return (
//     <div className="container mx-auto py-6">
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold tracking-tight">
//           Admin Dashboard Travesia
//         </h1>
//         <p className="text-muted-foreground">
//           Kelola pemesanan, paket wisata, dan pengguna sistem travel Travesia
//         </p>
//       </div>

//       <Tabs defaultValue="dashboard" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
//           <TabsTrigger value="bookings">Kelola Pengguna</TabsTrigger>
//           <TabsTrigger value="packages">Kelola Destinasi</TabsTrigger>
//           <TabsTrigger value="users">Kelola Blog</TabsTrigger>
//           <TabsTrigger value="users">Kelola Forum</TabsTrigger>
//         </TabsList>
//         <TabsContent value="dashboard" className="space-y-4">
//           {renderDashboard()}
//         </TabsContent>
//         <TabsContent value="bookings">{renderBookings()}</TabsContent>
//         <TabsContent value="packages">{renderPackages()}</TabsContent>
//         <TabsContent value="users">{renderUsers()}</TabsContent>
//         <TabsContent value="users">{renderUsers()}</TabsContent>
//       </Tabs>
//     </div>
//   );
// }

interface DashboardAdminPageProps {
  users: AllUsers;
  reservasi: AllReservasi;
  destinasi: AllDestinasi;
  blog: AllBlog;
  forum: AllForum;
}

const DashboardAdminPage = ({
  users,
  reservasi,
  destinasi,
  blog,
  forum,
}: DashboardAdminPageProps) => {
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
            headline="Admin Dashboard Travesia"
            tagline="Kelola pemesanan, paket wisata, dan pengguna sistem travel Travesia"
          />
        </div>

        <section className="container mx-auto py-4 px-4 md:py-6 md:px-12">
          <div className="flex flex-wrap gap-4">
            {[
              {
                title: "Total Pengguna",
                value: users?.length,
                description: "Pengguna aktif",
              },
              {
                title: "Total Reservasi",
                value: reservasi?.length,
                description: "Semua Reservasi Travesia",
              },
              {
                title: "Total Destinasi",
                value: destinasi?.length,
                description: "Paket tersedia",
              },
              {
                title: "Total Blog",
                value: blog?.length,
                description: "Blog tersedia",
              },
              {
                title: "Total Forum",
                value: forum?.length,
                description: "Forum tersedia",
              },
            ].map((item, index) => (
              <Card key={index} className="w-full max-w-72">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default DashboardAdminPage;
