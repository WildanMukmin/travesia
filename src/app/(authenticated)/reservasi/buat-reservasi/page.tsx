import RoleGate from "@/components/auth/role-gate";
import { currentUser } from "@/lib/authenticate";
import { Role } from "@prisma/client";

export default async function Page() {
  const user = await currentUser();
  if (user?.role === Role.MEMBER) {
    return (
      <RoleGate accessRole={Role.MEMBER}>
        <h1>Reservasi Buat Member</h1>
      </RoleGate>
    );
  }
}
