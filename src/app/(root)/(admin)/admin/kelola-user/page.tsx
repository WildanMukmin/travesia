import AdminKelolaAkunPage from "@/components/admin/admin-kelola-akun-page";
import { getAllUser } from "@/data/user";

export default async function Page() {
  const users = await getAllUser();
  return <AdminKelolaAkunPage users={users} />;
}
