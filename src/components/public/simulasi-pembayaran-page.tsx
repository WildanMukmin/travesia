"use client";

import { getReservasiById } from "@/actions/reservasi";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-succsess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { pembayaran } from "@/lib/pembayaran";
import { simulasiPembayaranSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle, CreditCard } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const ReservasiMemberSimulasiBayarPage = () => {
  const searchParams = useSearchParams();
  const reservasiId = searchParams.get("reservasiId");
  const userMemberId = searchParams.get("userMemberId");
  const userOwnerId = searchParams.get("userOwnerId");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [harga, setHarga] = useState("");

  if (!userMemberId || !reservasiId || !userOwnerId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="flex items-center mb-4 text-red-500">
          <AlertCircle className="mr-2 h-6 w-6" />
          <h2 className="text-xl font-bold">Parameter Tidak Lengkap</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Mohon maaf, parameter yang diperlukan untuk halaman ini belum lengkap.
        </p>
      </div>
    );
  }

  useEffect(() => {
    startTransition(() => {
      getReservasiById(reservasiId).then((data) => {
        const harga = data?.totalHarga && data?.totalHarga + 2000;
        setHarga(harga?.toString() ?? "");
        form.setValue("harga", harga?.toString() ?? "");
      });
    });
  }, [reservasiId]);

  const form = useForm<z.infer<typeof simulasiPembayaranSchema>>({
    resolver: zodResolver(simulasiPembayaranSchema),
    defaultValues: {
      reservasiId: reservasiId ?? "",
      userMemberId: userMemberId ?? "",
      userOwnerId: userOwnerId ?? "",
      harga: harga ?? "",
      namaPengirim: "",
      pesan: "",
    },
  });

  const handleSubmitData = (data: z.infer<typeof simulasiPembayaranSchema>) => {
    setErrorMessage("");
    setIsPending(true);
    startTransition(() => {
      pembayaran(data)
        .then((data) => {
          if (data?.error) {
            setErrorMessage(data?.error);
          }
          if (data?.success) {
            setSuccessMessage(data?.success);
          }
        })
        .finally(() => {
          setIsPending(false);
        });
    });
  };

  if (successMessage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="flex items-center mb-4 text-green-500">
          <CheckCircle className="mr-2 h-6 w-6" />
          <h2 className="text-xl font-bold">Pembayaran Berhasil</h2>
        </div>
        <p className="text-gray-600 mb-6">{successMessage}</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-10 px-4 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Simulasi Pembayaran
        </h1>
        <p className="text-gray-600">
          Silahkan lengkapi detail pembayaran anda
        </p>
      </div>

      <Card className="w-full mx-auto shadow-lg border-0 rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">
                Detail Pembayaran
              </CardTitle>
              <p className="text-blue-100 mt-1 text-sm">
                Reservasi ID: {reservasiId}
              </p>
            </div>
            <div className="flex items-center bg-white/20 rounded-lg p-3">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-1">Informasi Bank</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 font-medium">Bank Bang Will</p>
                <p className="text-gray-500 text-sm">
                  No. Rekening: 092981287234928
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 font-medium">Total Pembayaran</p>
                <p className="text-blue-700 font-bold text-lg">
                  {harga &&
                    parseFloat(harga).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitData)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="harga"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-gray-700">
                        Nominal Pembayaran
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={true}
                          className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                          placeholder="Masukkan nominal pembayaran"
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="namaPengirim"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-gray-700">
                        Nama Pengirim
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                          placeholder="Masukkan nama pengirim"
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="pesan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">
                      Pesan (Opsional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isPending}
                        className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 min-h-[100px]"
                        placeholder="Tambahkan pesan atau catatan"
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

              {errorMessage && <FormError message={errorMessage} />}
              {successMessage && <FormSuccess message={successMessage} />}

              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  {isPending ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Memproses...
                    </div>
                  ) : (
                    "Konfirmasi Pembayaran"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default ReservasiMemberSimulasiBayarPage;
