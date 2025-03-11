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

interface DashboardMemberPageProps {
  name: string;
}

const DashboardMemberPage = ({ name }: DashboardMemberPageProps) => {
  // Mock data - replace with actual data fetching
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
      link: "/reservasi",
      icon: <MapPinCheck className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Perjalanan Dibatalkan",
      value: "11",
      link: "/reservasi",
      icon: <MapPinX className="h-6 w-6 text-red-500" />,
    },
    {
      title: "Total Reservasi",
      value: "35",
      link: "/reservasi",
      icon: <Plane className="h-6 w-6 text-purple-500" />,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      {/* Main Content */}
      <section className="flex flex-col p-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Welcome Back, {name.charAt(0).toUpperCase() + name.slice(1)}
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <Link href={card.link}>
              <Card key={index} className="hover:shadow-lg transition-all">
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
