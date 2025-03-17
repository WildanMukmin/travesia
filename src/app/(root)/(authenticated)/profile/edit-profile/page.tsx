import RoleGate from "@/components/auth/role-gate";
import EditProfileMemberPage from "@/components/profile/edit-profile-member-page";
import EditProfileOwnerPage from "@/components/profile/edit-profile-owner-page";
import { currentUser } from "@/lib/authenticate";
import { getProfile } from "@/lib/profile";
import { Role } from "@prisma/client";

export default async function Page() {
  const user = await currentUser();
  if (user?.role === Role.MEMBER && user.id) {
    const userData = await getProfile(user.id);
    return (
      <RoleGate accessRole={Role.MEMBER}>
        <EditProfileMemberPage userData={userData} />
      </RoleGate>
    );
  }
  if (user?.role === Role.OWNER && user.id) {
    const userData = await getProfile(user.id);
    return (
      <RoleGate accessRole={Role.OWNER}>
        <EditProfileOwnerPage userData={userData} />
        <main>tetser</main>
      </RoleGate>
    );
  }
}
