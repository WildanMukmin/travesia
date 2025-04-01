import { getAllForum } from "@/actions/forum";
import AdminKelolaForumPage from "@/components/admin/admin-kelola-forum-page";

export default async function Page() {
  const forums = await getAllForum();
  return <AdminKelolaForumPage forums={forums} />;
}
