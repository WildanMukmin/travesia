import RoleGate from "@/components/auth/role-gate";
import DestinasiEditPage from "@/components/destinasi/detinasi-edit";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { currentUser } from "@/lib/authenticate";
import { Role } from "@prisma/client";
import { AlertCircle } from "lucide-react";
import { Suspense } from "react";

export default async function Page() {
  const user = await currentUser();

  if (user?.role === Role.OWNER) {
    return (
      <RoleGate accessRole={Role.OWNER}>
        <Suspense fallback={<div>Loading...</div>}>
          <DestinasiEditPage />
        </Suspense>
      </RoleGate>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Anda tidak memiliki akses ke halaman ini, Silahkan login sebagai
          Owner!
        </AlertDescription>
      </Alert>
    </div>
  );
}
