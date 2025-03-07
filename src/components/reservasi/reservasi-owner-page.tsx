import React from "react";
import { Activity, MapPinCheck, MapPinX, Plane } from "lucide-react";
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
import { Button } from "@/components/ui/button";

const ReservasiOwnerPage = () => {
  const memberData = {
    name: "Wildan Mukmin",
    memberSince: "January 2024",
    recentActivities: [
      {
        id: 1,
        date: "2024-03-01",
        action: "Booked Trip to Bali",
        amount: "Diproses",
      },
      {
        id: 2,
        date: "2024-02-15",
        action: "Hotel Reservation",
        amount: "Dibatalkan",
      },
      {
        id: 3,
        date: "2024-02-01",
        action: "Flight Booking",
        amount: "Selesai",
      },
    ],
  };

  const statsCards = [
    {
      title: "Perjalanan Selesai",
      value: "24",
      icon: <MapPinCheck className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Perjalanan Dibatalkan",
      value: "11",
      icon: <MapPinX className="h-6 w-6 text-red-500" />,
    },
    {
      title: "Total Reservasi",
      value: "35",
      icon: <Plane className="h-6 w-6 text-purple-500" />,
    },
  ];
  return (
    <main className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <section className="flex-1 p-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Reservasi Anda Owner
        </h2>
        <div className="flex space-x-4 mb-6">
          <Link href="/reservasi">
            <Button>Semua Perjalanan</Button>
          </Link>
          <Link href="/reservasi/reservasi-selesai">
            <Button>Perjalanan Selesai</Button>
          </Link>
          <Link href="/reservasi/reservasi-dibatalkan">
            <Button>Perjalanan Dibatalkan</Button>
          </Link>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-blue-600" />
              Tabel Reservasi
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
                {memberData.recentActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.date}</TableCell>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell className="text-right">
                      {activity.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default ReservasiOwnerPage;
