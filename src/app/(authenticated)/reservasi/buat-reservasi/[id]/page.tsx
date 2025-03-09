import RoleGate from "@/components/auth/role-gate";
import { currentUser } from "@/lib/authenticate";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  if (!id) {
    redirect("/destinasi");
  }

  const user = await currentUser();
  if (user?.role === Role.MEMBER) {
    return (
      <RoleGate accessRole={Role.MEMBER}>
        <h1>Reservasi Buat Member dengan destinasi id = {id}</h1>
      </RoleGate>
    );
  }
}
