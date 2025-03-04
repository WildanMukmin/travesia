import RoleGate from "@/components/auth/role-gate";
import DashboardAdminPage from "@/components/dashboard/dashboard-admin-page";
import DashboardMemberPage from "@/components/dashboard/dashboard-member-page";
import DashboardOwnerPage from "@/components/dashboard/dashboard-owner-page";
import { currentUser } from "@/lib/authenticate";
import { Role } from "@prisma/client";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function Page() {
  const user = await currentUser();
  if (user?.role === Role.ADMIN) {
    return (
      <RoleGate accessRole={Role.ADMIN}>
        <DashboardAdminPage />
      </RoleGate>
    );
  }
  if (user?.role === Role.MEMBER) {
    return (
      <RoleGate accessRole={Role.MEMBER}>
        <DashboardMemberPage />
      </RoleGate>
    );
  }
  if (user?.role === Role.OWNER) {
    return (
      <RoleGate accessRole={Role.OWNER}>
        <DashboardOwnerPage />
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
