import { getPaginatedDestinasi } from "@/actions/destinasi";
import DestinasiPage from "@/components/destinasi/destinasi-page";

export default async function Page() {
  const data = await getPaginatedDestinasi(1, 10);
  if (data) {
    return <DestinasiPage data={data?.data} />;
  }
}
