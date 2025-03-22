"use client";

import {
  penerimaanPengajuanPembatalanReservasi,
  ReservasiWithMember,
} from "@/actions/reservasi";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AlertPage from "@/components/utils/alert-page";
import ButtonPengajuanPembatalanTable from "@/components/utils/button-pengajuan-pembatalan";
import SuccessActionFeedbak from "@/components/utils/success-action";
import { Role } from "@prisma/client";
import {
  CalendarIcon,
  CheckCircleIcon,
  Clock,
  ClockIcon,
  DollarSign,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  XCircleIcon,
} from "lucide-react";
import { startTransition, useState } from "react";

interface ReservasiOwnerDetailPageProps {
  reservasiData: ReservasiWithMember;
}

const ReservasiOwnerDetailPage = ({
  reservasiData,
}: ReservasiOwnerDetailPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(reservasiData);
  const [successMessage, setSuccessMessage] = useState("");

  const statusColors = {
    diproses: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    pengajuan: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
    selesai: "bg-green-100 text-green-700 hover:bg-green-200",
    dibatalkan: "bg-red-100 text-red-700 hover:bg-red-200",
  };

  const statusIcons = {
    diproses: <ClockIcon className="w-4 h-4 mr-1" />,
    pengajuan: <ClockIcon className="w-4 h-4 mr-1" />,
    selesai: <CheckCircleIcon className="w-4 h-4 mr-1" />,
    dibatalkan: <XCircleIcon className="w-4 h-4 mr-1" />,
  };

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (!reservasiData || !data) {
    return (
      <AlertPage detail="Reservasi tidak ditemukan" title="Terjadi Kesalahan" />
    );
  }
  // console.log(
  //   `id reservasi : ${data.id}  id owner : ${data.destinasi.ownerId},  id member : ${data.member?.userId || ""}`
  // );

  const handleClickPengajuanPembatalan = (
    id: string,
    userOwnerId: string,
    userMemberId: string
  ) => {
    startTransition(() => {
      setIsLoading(true);

      penerimaanPengajuanPembatalanReservasi(id, userOwnerId, userMemberId)
        .then((res) => {
          if (res?.success) {
            setSuccessMessage(res.success);

            // Perbaikan dalam update state untuk mempertahankan semua properti
            setData((prevData) =>
              prevData
                ? {
                    ...prevData,
                    status: "dibatalkan",
                    member: prevData.member ?? null,
                    destinasi: prevData.destinasi ?? null, // Pastikan properti penting tetap ada
                  }
                : prevData
            );
          }
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };

  return (
    <main className="flex min-h-screen bg-gray-50">
      <section className="flex-1 p-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Halaman Reservasi
        </h2>
        {successMessage && (
          <SuccessActionFeedbak detail={successMessage} title="Success!" />
        )}
        <Card className="max-w-7xl mx-auto shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">
                Detail Reservasi
              </CardTitle>
              <Badge
                className={`${
                  statusColors[data.status as keyof typeof statusColors] ||
                  "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } px-3 py-1 flex items-center`}
              >
                {statusIcons[data.status as keyof typeof statusIcons]}
                {data.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">ID: {data.id}</p>
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
                      <span className="font-medium block">{data.namaUser}</span>
                      <span className="text-xs text-gray-500">
                        Nama Pengunjung
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <span className="block">{data.nomorTelfon}</span>
                      <span className="text-xs text-gray-500">
                        Nomor Telepon
                      </span>
                    </div>
                  </div>
                  {data.id && (
                    <div className="flex items-center gap-3">
                      <MailIcon className="w-5 h-5 text-orange-600 flex-shrink-0" />
                      <div>
                        <span className="block">{data.member?.user.email}</span>
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
                      <span className="font-medium block">
                        {data.destinasi.owner.user.name}
                      </span>
                      <span className="text-xs text-gray-500">Pemilik</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPinIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-medium">
                        {data.destinasi.namaDestinasi}
                      </span>
                      <span className="text-sm text-gray-600 block">
                        {data.destinasi.alamat}
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
                        {data.tanggalReservasi.toLocaleDateString(
                          "id-ID",
                          options
                        )}
                      </span>
                      <span className="text-xs text-gray-500">
                        Tanggal Kunjungan
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.createdAt && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-teal-600 flex-shrink-0" />
                      <div>
                        <span className="block">
                          {data.createdAt.toLocaleTimeString()}
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
                      <span className="block">{data.jumlahOrang} orang</span>
                      <span className="text-xs text-gray-500">
                        Jumlah Pengunjung
                      </span>
                    </div>
                  </div>
                </div>

                {data.catatanTambahan && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <h4 className="text-sm font-medium mb-1">
                      Catatan Tambahan:
                    </h4>
                    <p className="text-sm text-gray-700">
                      {data.catatanTambahan}
                    </p>
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
                      <span className="font-medium block">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 2, // Menghapus desimal jika tidak diperlukan
                        }).format(data.totalHarga)}
                      </span>
                      <span className="text-xs text-gray-500">Pembayaran</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 "></div>
          </CardContent>

          {data.status === "pengajuan" && (
            <CardFooter className="flex gap-3 justify-end pt-0">
              <ButtonPengajuanPembatalanTable
                role={Role.OWNER}
                isLoading={isLoading}
                typeButton="button"
                name="Terima Pengajuan Pembatalan Reservasi"
                aksi={() =>
                  handleClickPengajuanPembatalan(
                    data.id,
                    data.destinasi.owner.userId || "",
                    data.member?.userId || ""
                  )
                }
                content="Terima Pengajuan"
              />
            </CardFooter>
          )}
        </Card>
      </section>
    </main>
  );
};

export default ReservasiOwnerDetailPage;
