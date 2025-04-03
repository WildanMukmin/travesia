import RoleGate from "@/components/auth/role-gate";
import EditProfileMemberPage from "@/components/profile/edit-profile-member-page";
import EditProfileOwnerPage from "@/components/profile/edit-profile-owner-page";
import ProfileMemberPage from "@/components/profile/profile-member-page";
import ProfileOwnerPage from "@/components/profile/profile-owner-page";
import { Button } from "@/components/ui/button";
import AlertPage from "@/components/utils/alert-page";
import { getUserById } from "@/data/user";
import { getProfile } from "@/lib/profile";
import { Role } from "@prisma/client";
import { UserPen } from "lucide-react";
import Link from "next/link";
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    return null;
  }

  const user = await getUserById(id);
  if (user?.role === Role.MEMBER && user.id) {
    const userData = await getProfile(user.id);
    return (
      <RoleGate accessRole={Role.ADMIN}>
        <main className="py-8 px-4 w-full mx-auto max-w-6xl">
          <Link
            className="text-blue-600 underline underline-offset-1"
            href={`/admin/kelola-user/detail/${user.id}`}
          >
            Kembali ke Detail...
          </Link>
          <EditProfileMemberPage userData={userData} admin={true} />
        </main>
      </RoleGate>
    );
  }
  if (user?.role === Role.OWNER && user.id) {
    const userData = await getProfile(user.id);
    return (
      <RoleGate accessRole={Role.ADMIN}>
        <main className="py-8 px-4 w-full mx-auto max-w-6xl">
          <Link
            className="text-blue-600 underline underline-offset-1"
            href={`/admin/kelola-user/detail/${user.id}`}
          >
            Kembali ke Detail...
          </Link>
          <EditProfileOwnerPage userData={userData} admin={true} />
        </main>
      </RoleGate>
    );
  }

  return (
    <AlertPage
      detail="sepertinya kamu ngide ya ke halaman ini"
      title="Ada yang salah ni"
    />
  );
}
