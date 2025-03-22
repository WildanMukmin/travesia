"use client";

import {
  pengajuanPembatalanReservasi,
  ReservasiWithMemberAll,
} from "@/actions/reservasi";
import ReservasiWrapComponent from "@/components/reservasi/reservasi-wrap-component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AlertTable from "@/components/utils/alert-table";
import ButtonDetailTable from "@/components/utils/button-detail-table";
import ButtonPengajuanPembatalanTable from "@/components/utils/button-pengajuan-pembatalan";
import SuccessActionFeedbak from "@/components/utils/success-action";
import { Role } from "@prisma/client";
import { Activity } from "lucide-react";
import { startTransition, useState } from "react";

interface ReservasiMemberPageProps {
  reservasiData: ReservasiWithMemberAll;
}

const ReservasiMemberPage = ({ reservasiData }: ReservasiMemberPageProps) => {
  const [data, setData] = useState(reservasiData);
  const [posisi, setPosisi] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleClickPengajuanPembatalan = (
    id: string,
    userOwnerId: string,
    userMemberId: string,
  ) => {
    startTransition(() => {
      setIsLoading(true);

      pengajuanPembatalanReservasi(id, userOwnerId, userMemberId).then(
        (res) => {
          if (res.success) {
            setSuccessMessage(res.success);
          }
          handleFilterAfterPengajuan(id);
          if (posisi === "diproses") {
            handleFilter("diproses");
          }

          setIsLoading(false);
        },
      );
    });
  };

  const handleFilter = (status: string) => {
    const temp = reservasiData?.filter((item) => item.status === status);
    if (status === "all") {
      setPosisi("");
      setData(reservasiData);
    } else {
      const filtered = temp?.filter((item) => item.status === status);
      setData(filtered || []);
      setPosisi(status);
    }
  };

  const handleFilterAfterPengajuan = (id: string) => {
    const filtered = data?.map((item) => {
      if (item.id === id) {
        item.status = "pengajuan";
      }
      return item;
    });
    setData(filtered || []);
  };
  return (
    <ReservasiWrapComponent handleFilter={handleFilter} role={Role.MEMBER}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5 text-blue-600" />
            Tabel Reservasi {posisi.charAt(0).toUpperCase() + posisi.slice(1)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <SuccessActionFeedbak detail={successMessage} title="Success!" />
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Aktivitas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.length > 0 ? (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.namaUser}</TableCell>
                    <TableCell>
                      {item.tanggalReservasi.toLocaleDateString()}
                    </TableCell>
                    <TableCell>{item.destinasi.namaDestinasi}</TableCell>
                    <TableCell>
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 flex-row-reverse">
                        <ButtonDetailTable
                          name=""
                          reservasiId={item.id}
                          content="Detail"
                        />
                        {item.status === "diproses" && (
                          <ButtonPengajuanPembatalanTable
                            isLoading={isLoading}
                            name=""
                            aksi={() =>
                              handleClickPengajuanPembatalan(
                                item.id,
                                item.destinasi.owner.userId,
                                item.member?.userId || "",
                              )
                            }
                            content="Ajukan Pembatalan"
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>
                    <AlertTable
                      detail="Belum ada reservasi"
                      title="Data Kosong"
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </ReservasiWrapComponent>
  );
};

export default ReservasiMemberPage;
