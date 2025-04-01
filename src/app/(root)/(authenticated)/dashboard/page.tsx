import { getAllBlog } from "@/actions/blog";
import { getAllDestinasi } from "@/actions/destinasi";
import { getAllForum } from "@/actions/forum";
import { getOwnerDestinasi } from "@/actions/owner";
import { getAllReservasi, getAllReservasiByUserId } from "@/actions/reservasi";
import RoleGate from "@/components/auth/role-gate";
import DashboardAdminPage from "@/components/dashboard/dashboard-admin-page";
import DashboardMemberPage from "@/components/dashboard/dashboard-member-page";
import DashboardOwnerPage from "@/components/dashboard/dashboard-owner-page";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAllUser } from "@/data/user";
import { currentUser } from "@/lib/authenticate";
import { getNotificationByUserId } from "@/lib/notifikasi";
import { Role } from "@prisma/client";
import { AlertCircle } from "lucide-react";

export default async function Page() {
  const user = await currentUser();
  if (user?.role === Role.ADMIN) {
    const users = await getAllUser();
    const reservasi = await getAllReservasi();
    const destinasi = await getAllDestinasi();
    const blog = await getAllBlog();
    const forum = await getAllForum();
    return (
      <RoleGate accessRole={Role.ADMIN}>
        <DashboardAdminPage
          users={users}
          reservasi={reservasi}
          destinasi={destinasi}
          blog={blog}
          forum={forum}
        />
      </RoleGate>
    );
  }
  if (user?.role === Role.MEMBER && user.id) {
    const reservasiData = await getAllReservasiByUserId(user.id, user.role);
    const notifikasi = await getNotificationByUserId(user.id || "");
    return (
      <RoleGate accessRole={Role.MEMBER}>
        <DashboardMemberPage
          name={user.name || "Member"}
          reservasiData={reservasiData}
          notifikasi={notifikasi}
        />
      </RoleGate>
    );
  }
  if (user?.role === Role.OWNER) {
    const data = await getOwnerDestinasi(user.id || "");
    const notifikasi = await getNotificationByUserId(user.id || "");
    return (
      <RoleGate accessRole={Role.OWNER}>
        <DashboardOwnerPage
          ownerDestinasiData={data}
          name={user.name || "Owner"}
          notifikasi={notifikasi}
        />
      </RoleGate>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Terjadi kesalahan, silahkan login kembali
        </AlertDescription>
      </Alert>
    </div>
  );
}
