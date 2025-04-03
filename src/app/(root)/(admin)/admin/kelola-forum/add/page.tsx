import RoleGate from "@/components/auth/role-gate";
import ForumPostingPage from "@/components/forum/forum-posting-page";
import { currentUser } from "@/lib/authenticate";
import { Role } from "@prisma/client";

export default async function Page() {
  const user = await currentUser();

  return (
    <RoleGate accessRole={Role.ADMIN}>
      <ForumPostingPage userId={user?.id || ""} admin={true} />;
    </RoleGate>
  );
}
