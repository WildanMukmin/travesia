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
import { tabelData } from "./dummy-data";

const ReservasiMemberDibatalkanPage = () => {
  const handleClickDetail = (id: string) => {
    console.log("Detail button clicked");
  };

  const handleClickDelete = (id: string) => {
    console.log("Delete button clicked");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5 text-blue-600" />
          Tabel Reservasi Dibatalkan
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
            {tabelData.length > 0 ? (
              tabelData.map(
                (activity) =>
                  activity.status === "dibatalkan" && (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.name}</TableCell>
                      <TableCell>{activity.date}</TableCell>
                      <TableCell>{activity.activity}</TableCell>
                      <TableCell>
                        {activity.status.charAt(0).toUpperCase() +
                          activity.status.slice(1)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 flex-row-reverse">
                          <ButtonDetailTable
                            name=""
                            aksi={() => handleClickDetail(activity.id)}
                            content="Detail"
                          />
                          <ButtonDeleteTable
                            name=""
                            aksi={() => handleClickDelete(activity.id)}
                            content="Hapus"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ),
              )
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
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
  );
};

export default ReservasiMemberDibatalkanPage;
