"use client";

import { Activity, MapPinCheck, MapPinX, Plane, Bell, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { ReservasiWithMemberAll } from "@/actions/reservasi";
import AlertTable from "@/components/utils/alert-table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  deleteNotifikasi,
  NotifikasiType,
  updateReadNotifikasi,
} from "@/lib/notifikasi";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface DashboardMemberPageProps {
  name: string;
  reservasiData: ReservasiWithMemberAll;
  notifikasi: NotifikasiType;
}

const DashboardMemberPage = ({
  name,
  reservasiData,
  notifikasi,
}: DashboardMemberPageProps) => {
  const perjalananSelesaiCount = reservasiData?.filter(
    (item) => item.status === "selesai"
  ).length;
  const perjalananDibatalkanCount = reservasiData?.filter(
    (item) => item.status === "dibatalkan"
  ).length;

  const [notifikasiData, setNotifikasiData] = useState(notifikasi || []);
  const [unreadCount, setUnreadCount] = useState(
    notifikasiData?.filter((notif) => notif.status === "belum-dibaca").length ||
      0
  );

  const handleReadNotifikasi = async (id: string) => {
    try {
      const result = await updateReadNotifikasi(id);

      if (result) {
        // Update the notif status in state
        const updatedNotifikasi = notifikasiData.map((item) => {
          if (item.id === id) {
            return { ...item, status: "sudah-dibaca" };
          }
          return item;
        });
        setNotifikasiData(updatedNotifikasi);
        setUnreadCount((prevCount) => Math.max(0, prevCount - 1));
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleDeleteNotifikasi = async (id: string) => {
    try {
      const result = await deleteNotifikasi(id);

      if (result) {
        const updatedNotifikasi = notifikasiData.filter(
          (notif) => notif.id !== id
        );
        setNotifikasiData(updatedNotifikasi);
        setUnreadCount((prevCount) => Math.max(0, prevCount - 1));
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const statsCards = [
    {
      title: "Perjalanan Selesai",
      value: perjalananSelesaiCount,
      link: "/reservasi",
      icon: <MapPinCheck className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Perjalanan Dibatalkan",
      value: perjalananDibatalkanCount,
      link: "/reservasi",
      icon: <MapPinX className="h-6 w-6 text-red-500" />,
    },
    {
      title: "Total Reservasi",
      value: reservasiData?.length,
      link: "/reservasi",
      icon: <Plane className="h-6 w-6 text-purple-500" />,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      {/* Header with Notification Icon */}
      <div className="flex justify-between items-center p-8 pb-0">
        <h2 className="text-3xl font-semibold text-gray-800">
          Welcome Back, {name.charAt(0).toUpperCase() + name.slice(1)}
        </h2>
        <div className="relative">
          <Sheet>
            <SheetTrigger className="p-2 rounded-full shadow hover:shadow-md transition-all cursor-pointer">
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[700px]">
              <SheetHeader>
                <SheetTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-blue-600" />
                  Notifikasi
                </SheetTitle>
                <SheetDescription asChild>
                  <CardContent>
                    {notifikasiData.length > 0 ? (
                      <ScrollArea className="h-[500px] w-full rounded-md">
                        <div className="space-y-3">
                          {notifikasiData.map((notif) => (
                            <div
                              key={notif.id}
                              className={`p-4 border rounded-lg transition-all ${
                                notif.status === "belum-dibaca"
                                  ? "bg-blue-50 border-blue-300"
                                  : "bg-white border-gray-200"
                              } hover:shadow-md`}
                            >
                              <Button
                                className="relative p-0 -top-3 -right-60 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center z-10"
                                onClick={() => handleDeleteNotifikasi(notif.id)}
                              >
                                <X size={14} />
                              </Button>
                              <Link href={notif.link} className="block">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-semibold text-gray-900">
                                      {notif.type.charAt(0).toUpperCase() +
                                        notif.type.slice(1)}
                                    </h4>
                                    <p className="text-gray-600 mt-1 text-sm">
                                      {notif.pesan}
                                    </p>
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    {notif.createdAt.toLocaleDateString()}
                                  </span>
                                </div>
                              </Link>
                              {notif.status === "belum-dibaca" && (
                                <div className="mt-2 flex justify-end">
                                  <Button
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                    variant="ghost"
                                    onClick={() =>
                                      handleReadNotifikasi(notif.id)
                                    }
                                  >
                                    Tandai Sudah Dibaca
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    ) : (
                      <div className="mt-4">
                        <AlertTable
                          detail="Anda belum memiliki notifikasi baru"
                          title="Tidak ada notifikasi"
                        />
                      </div>
                    )}
                  </CardContent>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <section className="flex flex-col p-8 pt-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <Link href={card.link} key={index}>
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="flex items-center p-6">
                  {card.icon}
                  <div className="ml-4">
                    <h3 className="text-sm text-gray-500">{card.title}</h3>
                    <p className="text-2xl font-bold">{card.value}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-blue-600" />
              Aktifitas Terkini
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Aktivitas</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservasiData &&
                  reservasiData.slice(0, 3).map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>
                        {activity.tanggalReservasi.toLocaleDateString()}
                      </TableCell>
                      <TableCell>{activity.destinasi.namaDestinasi}</TableCell>
                      <TableCell className="text-right">
                        {activity.status}
                      </TableCell>
                    </TableRow>
                  ))}
                {reservasiData && reservasiData.length > 3 && (
                  <TableRow>
                    <TableCell>.....</TableCell>
                    <TableCell>.....</TableCell>
                    <TableCell className="text-right">.....</TableCell>
                  </TableRow>
                )}
                {reservasiData && reservasiData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <AlertTable
                        detail="Belum ada aktivitas terakhir"
                        title="Tidak ada aktivitas"
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
      <section>
        <div className="flex p-8 gap-8">
          <Link href={"/blog"} className="w-full">
            <Card className="hover:shadow-lg transition-all w-full">
              <CardContent className="flex items-center p-6">
                <div className="ml-4">
                  <h3 className="text-sm text-gray-500">
                    Postingan Blog Terakhir
                  </h3>
                  <p className="text-2xl font-bold">blog</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href={"/blog"} className="w-full">
            <Card className="hover:shadow-lg transition-all w-full">
              <CardContent className="flex items-center p-6">
                <div className="ml-4">
                  <h3 className="text-sm text-gray-500">
                    Postingan Forum Terakhir
                  </h3>
                  <p className="text-2xl font-bold">Forum</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default DashboardMemberPage;
