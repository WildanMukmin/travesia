import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { currentUserRole } from "@/lib/authenticate";
import { Role } from "@prisma/client";
import { AlertCircle } from "lucide-react";

interface RoleGateProps {
  children: React.ReactNode;
  accessRole: Role;
}

const RoleGate = async ({ children, accessRole }: RoleGateProps) => {
  const role = await currentUserRole();
  if (role !== accessRole) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Terjadi Kesalahan</AlertTitle>
          <AlertDescription>
            Kamu tidak memiliki akses ke halaman ini
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  return <>{children}</>;
};
export default RoleGate;
