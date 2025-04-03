import { getForumById } from "@/actions/forum";
import RoleGate from "@/components/auth/role-gate";
import ForumEditPage from "@/components/forum/forum-edit-page";
import { currentUser } from "@/lib/authenticate";
import { Role } from "@prisma/client";

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
  const forum = await getForumById(id);
  return (
    <RoleGate accessRole={Role.ADMIN}>
      <ForumEditPage
        forumData={forum}
        userId={forum?.userId || ""}
        admin={true}
      />
    </RoleGate>
  );
}
