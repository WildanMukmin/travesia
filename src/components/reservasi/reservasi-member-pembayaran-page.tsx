"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Loader2, Copy, Download } from "lucide-react";
import { ReservasiWithMember } from "@/actions/reservasi";

interface ReservasiMemberPembayaranPageProps {
  id: string;
  reservasi: ReservasiWithMember;
}

const ReservasiMemberPembayaranPage = ({
  id,
  reservasi,
}: ReservasiMemberPembayaranPageProps) => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const generateQRCode = async () => {
      const url = `https://travesia-red.vercel.app/reservasi/bayar-reservasi?id=${id}&harga=${reservasi?.totalHarga}`;
      const qrCodeDataURL = await QRCode.toDataURL(url);
      setQrCode(qrCodeDataURL);
    };
    generateQRCode();
  }, [id]);

  useEffect(() => {
    const updateCountdown = () => {
      const expiredTime = new Date(reservasi?.expired ?? new Date()).getTime();
      const now = Date.now();
      const diff = expiredTime - now;

      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeRemaining(`${hours} jam ${minutes} menit`);
      } else {
        setTimeRemaining("Waktu pembayaran telah habis");
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update tiap 1 menit
    return () => clearInterval(interval);
  }, [reservasi]);

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  const paymentInfo = {
    noRekening: "092981287234928",
    bank: "Bank Bang Will",
    atasNama: "PT Wildan Mukmin",
    nominal: reservasi?.totalHarga ?? 0,
    biayaAdmin: 2000,
    totalPembayaran: (reservasi?.totalHarga ?? 0) + 2000,
  };

  return (
    <div className="container mx-auto py-10 px-4 w-full">
      <Card className="shadow-lg">
        <CardHeader className="text-center bg-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="text-xl">Pembayaran Reservasi</CardTitle>
          <CardDescription className="text-primary-foreground/90">
            ID Transaksi: {id}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              {qrCode && (
                <Image
                  src={qrCode}
                  width={200}
                  height={200}
                  alt="QR Code Pembayaran"
                  className="mx-auto"
                />
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Scan QR code untuk melakukan pembayaran
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Detail Pembayaran</h3>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="text-muted-foreground">Bank</p>
              <p className="font-medium text-right">{paymentInfo.bank}</p>

              <p className="text-muted-foreground">No. Rekening</p>
              <div className="flex items-center justify-end gap-1">
                <p className="font-medium">{paymentInfo.noRekening}</p>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-muted-foreground">Atas Nama</p>
              <p className="font-medium text-right">{paymentInfo.atasNama}</p>
            </div>

            <Alert variant="default" className="bg-primary/5 border-primary/20">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Nominal Pembayaran</p>
                  <p className="font-medium">
                    {formatRupiah(paymentInfo.nominal)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Biaya Admin</p>
                  <p className="font-medium">
                    {formatRupiah(paymentInfo.biayaAdmin)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-medium">Total Pembayaran</p>
                  <p className="font-bold text-primary">
                    {formatRupiah(paymentInfo.totalPembayaran)}
                  </p>
                </div>
              </div>
            </Alert>

            <div className="flex items-center justify-between bg-yellow-50 p-3 rounded-md border border-yellow-200">
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 text-yellow-500 mr-2 animate-spin" />
                <p className="text-sm text-yellow-700">Menunggu Pembayaran</p>
              </div>
              <p className="text-sm font-medium text-yellow-700">
                Expired dalam: {timeRemaining}
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Unduh Instruksi Pembayaran
          </Button>
          <Button variant="outline" className="w-full">
            Kembali ke Beranda
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReservasiMemberPembayaranPage;
