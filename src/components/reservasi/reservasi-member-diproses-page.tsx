"use client";

import { Activity } from "lucide-react";
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
import ButtonDeleteTable from "@/components/utils/button-delete-table";
import ReservasiWrapComponent from "@/components/reservasi/reservasi-wrap-component";
import { tabelData } from "./dummy-data";
import { Role } from "@prisma/client";
import { ReservasiWithMemberAll } from "@/actions/reservasi";

interface ReservasiMemberDiprosesPageProps {
  reservasiData: ReservasiWithMemberAll;
}

const ReservasiMemberDiprosesPage = ({
  reservasiData,
}: ReservasiMemberDiprosesPageProps) => {
  const handleClickDelete = (id: string) => {
    console.log("Delete button clicked");
  };

  return (
    <ReservasiWrapComponent role={Role.MEMBER}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5 text-blue-600" />
            Tabel Reservasi Diproses
          </CardTitle>
        </CardHeader>
        <CardContent>
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
              {reservasiData && reservasiData.length > 0 ? (
                (() => {
                  const selesaiReservasi = reservasiData.filter(
                    (data) => data.status === "diproses",
                  );

                  return selesaiReservasi.length > 0 ? (
                    selesaiReservasi.map((data) => (
                      <TableRow key={data.id}>
                        <TableCell>{data.namaUser}</TableCell>
                        <TableCell>
                          {new Date(data.tanggalReservasi).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{data.status}</TableCell>
                        <TableCell>
                          {data.status.charAt(0).toUpperCase() +
                            data.status.slice(1)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 flex-row-reverse">
                            <ButtonDetailTable
                              name=""
                              reservasiId={data.id}
                              content="Detail"
                            />
                            <ButtonDeleteTable
                              name=""
                              aksi={() => handleClickDelete(data.id)}
                              content="Hapus"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        <AlertTable
                          detail="Belum ada reservasi selesai"
                          title="Data Kosong"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })()
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
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

export default ReservasiMemberDiprosesPage;
