"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  PhoneIcon,
  UserIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  MailIcon,
  Clock,
  DollarSign,
  Backpack,
} from "lucide-react";
import AlertPage from "@/components/utils/alert-page";
import { useState } from "react";

interface ReservasiMemberDetailPageProps {
  id: string;
  namaUser: string;
  telponUser: string;
  emailUser?: string;
  namaOwner: string;
  namaDestinasi: string;
  alamatDestinasi: string;
  jumlahOrang: number;
  tanggalReservasi: string;
  catatanTambahan?: string;
  jamReservasi?: Date;
  statusReservasi: string;
}

const ReservasiMemberDetailPage = ({
  id,
  namaUser,
  telponUser,
  emailUser,
  namaOwner,
  namaDestinasi,
  alamatDestinasi,
  tanggalReservasi,
  catatanTambahan,
  jumlahOrang,
  jamReservasi,
  statusReservasi,
}: ReservasiMemberDetailPageProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const statusColors = {
    diproses: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
    selesai: "bg-green-100 text-green-700 hover:bg-green-200",
    dibatalkan: "bg-red-100 text-red-700 hover:bg-red-200",
  };

  const statusIcons = {
    diproses: <ClockIcon className="w-4 h-4 mr-1" />,
    selesai: <CheckCircleIcon className="w-4 h-4 mr-1" />,
    dibatalkan: <XCircleIcon className="w-4 h-4 mr-1" />,
  };

  const handleCancel = async () => {
    console.log("Cancel button clicked");
  };

  const handleComplete = async () => {
    console.log("Cancel button clicked");
  };

  const formatTanggal = (tanggal: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(tanggal).toLocaleDateString("id-ID", options);
  };

  if (!id) {
    return (
      <AlertPage detail="Reservasi tidak ditemukan" title="Terjadi Kesalahan" />
    );
  }

  return (
    <Card className="max-w-7xl mx-auto shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Detail Reservasi</CardTitle>
          <Badge
            className={`${
              statusColors[statusReservasi as keyof typeof statusColors] ||
              "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } px-3 py-1 flex items-center`}
          >
            {statusIcons[statusReservasi as keyof typeof statusIcons]}
            {statusReservasi}
          </Badge>
        </div>
        <p className="text-sm text-gray-500">ID: {id}</p>
      </CardHeader>

      <CardContent className="space-y-6 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">
              Informasi Pengunjung
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <UserIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <span className="font-medium block">{namaUser}</span>
                  <span className="text-xs text-gray-500">Nama Pengunjung</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <span className="block">{telponUser}</span>
                  <span className="text-xs text-gray-500">Nomor Telepon</span>
                </div>
              </div>
              {emailUser && (
                <div className="flex items-center gap-3">
                  <MailIcon className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <div>
                    <span className="block">{emailUser}</span>
                    <span className="text-xs text-gray-500">Email</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">
              Informasi Destinasi
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <UserIcon className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <div>
                  <span className="font-medium block">{namaOwner}</span>
                  <span className="text-xs text-gray-500">Pemilik</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium">{namaDestinasi}</span>
                  <span className="text-sm text-gray-600 block">
                    {alamatDestinasi}
                  </span>
                  <span className="text-xs text-gray-500">Lokasi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">
              Detail Kunjungan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <div>
                  <span className="block">
                    {formatTanggal(tanggalReservasi)}
                  </span>
                  <span className="text-xs text-gray-500">
                    Tanggal Kunjungan
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jamReservasi && (
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <div>
                    <span className="block">
                      {jamReservasi.toLocaleTimeString()}
                    </span>
                    <span className="text-xs text-gray-500">
                      Jam Reservasi dibuat
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <UserIcon className="w-5 h-5 text-teal-600 flex-shrink-0" />
                <div>
                  <span className="block">{jumlahOrang} orang</span>
                  <span className="text-xs text-gray-500">
                    Jumlah Pengunjung
                  </span>
                </div>
              </div>
            </div>

            {catatanTambahan && (
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-sm font-medium mb-1">Catatan Tambahan:</h4>
                <p className="text-sm text-gray-700">{catatanTambahan}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">
              Rincian Pembayaran
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <div>
                  <span className="font-medium block">Rp 1000.000.000,00</span>
                  <span className="text-xs text-gray-500">Pembayaran</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 "></div>
      </CardContent>

      {statusReservasi === "diproses" && (
        <CardFooter className="flex gap-3 justify-end pt-0">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            disabled={isLoading}
          >
            <XCircleIcon className="w-4 h-4 mr-2" />
            Ajukan Pembatalan
          </Button>
          <Button
            onClick={handleComplete}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            <Backpack className="w-4 h-4 mr-2" />
            Bayar
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ReservasiMemberDetailPage;
