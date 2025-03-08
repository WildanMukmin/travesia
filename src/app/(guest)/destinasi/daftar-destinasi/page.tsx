import RoleGate from "@/components/auth/role-gate";
import { currentUser } from "@/lib/authenticate";
import { Role } from "@prisma/client";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DestinasiDaftarPage from "@/components/destinasi/detinasi-daftar";

export default async function Page() {
  const user = await currentUser();

  if (user?.role === Role.OWNER) {
    return (
      <RoleGate accessRole={Role.OWNER}>
        <DestinasiDaftarPage userId={user.id || ""} />
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
