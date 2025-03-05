import {
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  Activity,
  MapPinCheck,
  MapPinX,
  Plane,
} from "lucide-react";
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

const DashboardMemberPage = () => {
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
      link: "#",
      icon: <MapPinCheck className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Perjalanan Dibatalkan",
      value: "11",
      link: "#",
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
    <main className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white p-6 shadow-2xl">
        <div className="flex items-center mb-8">
          <Avatar className="mr-3">
            <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold">{memberData.name}</h1>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <Link href={item.href} key={index} className="block">
              <Button
                variant="ghost"
                className="w-full justify-start text-left hover:bg-blue-800"
              >
                {item.icon}
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </aside> */}

      {/* Main Content */}
      <section className="flex-1 p-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Welcome Back, {memberData.name}
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
    </main>
  );
};

export default DashboardMemberPage;
