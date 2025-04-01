import { getDestinasi } from "@/actions/destinasi";
import AdminKelolaDestinasiPage from "@/components/admin/admin-kelola-destinasi-page";

export default async function Page() {
  const destinasi = await getDestinasi();
  return <AdminKelolaDestinasiPage destinasi={destinasi} />;
}
