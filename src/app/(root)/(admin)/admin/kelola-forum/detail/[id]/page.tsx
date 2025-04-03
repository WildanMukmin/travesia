import { getForumById } from "@/actions/forum";
import ForumPage from "@/components/forum/forum-page";
import { currentUser } from "@/lib/authenticate";
import RoleGate from "@/components/auth/role-gate";
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
  const user = await currentUser();
  const forum = await getForumById(id);
  if (!user) {
    return (
      <main>
        <h1>Ada yang salah ni</h1>
      </main>
    );
  }
  return (
    <RoleGate accessRole={Role.ADMIN}>
      <div className="max-w-screen-xl mx-auto px-4">
        <ForumPage forumData={forum} user={user} userName={user.name || ""} />
      </div>
    </RoleGate>
  );
}
