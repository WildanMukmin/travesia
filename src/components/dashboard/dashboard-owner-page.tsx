"use client";

import { OwnerWithDestinasi } from "@/actions/owner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AlertTable from "@/components/utils/alert-table";
import {
  deleteNotifikasi,
  NotifikasiType,
  updateReadNotifikasi,
} from "@/lib/notifikasi";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Clock,
  DollarSign,
  Info,
  MapPin,
  Sparkles,
  SquarePen,
  UserIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface DashboardOwnerPageProps {
  name: string;
  ownerDestinasiData: OwnerWithDestinasi;
  notifikasi: NotifikasiType;
}

const DashboardOwnerPage = ({
  name,
  ownerDestinasiData,
  notifikasi,
}: DashboardOwnerPageProps) => {
  const [notifikasiData, setNotifikasiData] = useState(notifikasi || []);
  const [unreadCount, setUnreadCount] = useState(
    notifikasiData?.filter((notif) => notif.status === "belum-dibaca").length ||
      0
  );

  const handleReadNotifikasi = async (id: string) => {
    try {
      const result = await updateReadNotifikasi(id);

      if (result) {
        // Update the notification status in state
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

  return (
    <main className="flex flex-col bg-gray-50">
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

      <section className="p-8">
        {ownerDestinasiData?.owner?.destinasi ? (
          <Card className="w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative w-full h-96 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <Image
                src={
                  ownerDestinasiData.owner.destinasi.image?.gambar ||
                  "https://images.unsplash.com/photo-1724271362937-391a150db603?w=500&auto=format&fit=crop&q=60"
                }
                alt={ownerDestinasiData?.owner?.destinasi?.namaDestinasi}
                fill
                className="w-full h-full object-cover"
              />
              {ownerDestinasiData?.owner?.destinasi?.buka ? (
                <Badge className="absolute top-4 right-4 z-20 bg-green-500 hover:bg-green-600">
                  Buka
                </Badge>
              ) : (
                <Badge className="absolute top-4 right-4 z-20 bg-red-500 hover:bg-red-600">
                  Tutup
                </Badge>
              )}
            </div>

            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {ownerDestinasiData?.owner?.destinasi?.namaDestinasi}
                </h2>
                <Badge
                  variant="outline"
                  className="bg-blue-20 text-xl text-blue-700 border-blue-200"
                >
                  {ownerDestinasiData?.owner?.destinasi?.kategoriLokasi}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="prose max-w-none">
                    <p className="text-gray-600 mb-6">
                      {ownerDestinasiData?.owner?.destinasi?.deskripsi}
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Fasilitas
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {ownerDestinasiData?.owner?.destinasi?.fasilitas?.map(
                        (fasilitas: string, index: number) => (
                          <div className="flex items-center" key={index}>
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <BadgeCheck className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-gray-700">{fasilitas}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 px-6 pb-6 rounded-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Informasi
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <UserIcon className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Pengelola
                          </h4>
                          <p className="text-gray-600">
                            {ownerDestinasiData?.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-900">Lokasi</h4>
                          <p className="text-gray-600">
                            {ownerDestinasiData?.owner?.destinasi?.alamat}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Clock className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Jam Operasional
                          </h4>
                          <p className="text-gray-600">
                            {ownerDestinasiData?.owner?.destinasi.jamOprasional}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <DollarSign className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Harga Tiket
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 2,
                            }).format(
                              Number(
                                ownerDestinasiData?.owner?.destinasi?.harga
                              )
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between pt-2 border-t">
              <div className="text-sm text-gray-500 flex items-center">
                <Info className="w-4 h-4 mr-1" />
                ID: {ownerDestinasiData?.owner?.destinasi?.id.substring(0, 8)}
                ...
              </div>
              <Link
                href={`/destinasi/edit-destinasi?id=${ownerDestinasiData?.owner?.destinasi?.id}`}
              >
                <Button size={"sm"}>
                  <SquarePen className="mr-2 h-4 w-4" />
                  Edit Destinasi
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ) : (
          <Link href={`/destinasi/daftar-destinasi`}>
            <div className="w-full flex items-center justify-center p-6">
              <div className="w-full relative overflow-hidden group">
                <Button className="w-full py-10 h-56  border-none relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105">
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="flex items-center mb-2">
                      <span className="text-4xl font-bold">
                        Daftarkan Destinasi Anda
                      </span>
                    </div>

                    <p className="text-lg opacity-90">
                      Promosikan tempat wisata Anda ke ribuan pengunjung
                    </p>

                    <div className="flex items-center mt-4 text-lg">
                      <span>Mulai Sekarang</span>
                      <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
                    </div>
                  </div>

                  <Sparkles className="absolute top-6 right-10 h-8 w-8 text-yellow-300 animate-pulse" />
                </Button>
              </div>
            </div>
          </Link>
        )}
      </section>

      <section className="p-8">
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

export default DashboardOwnerPage;
