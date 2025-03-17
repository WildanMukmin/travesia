import RoleGate from "@/components/auth/role-gate";
import ProfileMemberPage from "@/components/profile/profile-member-page";
import ProfileOwnerPage from "@/components/profile/profile-owner-page";
import { currentUser } from "@/lib/authenticate";
import { getProfile } from "@/lib/profile";
import { Role } from "@prisma/client";

export default async function Page() {
  const user = await currentUser();
  if (user?.role === Role.MEMBER && user.id) {
    const userData = await getProfile(user.id);
    return (
      <RoleGate accessRole={Role.MEMBER}>
        <ProfileMemberPage userData={userData} />
      </RoleGate>
    );
  }
  if (user?.role === Role.OWNER && user.id) {
    const userData = await getProfile(user.id);
    return (
      <RoleGate accessRole={Role.OWNER}>
        <ProfileOwnerPage userData={userData} />
      </RoleGate>
    );
  }
}
