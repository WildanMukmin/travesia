import { getAllDestinasi } from "@/actions/destinasi";
import DestinasiPage from "@/components/destinasi/destinasi-page";

export default async function Page() {
  const data = await getAllDestinasi();
  if (data) {
    return <DestinasiPage data={data} />;
  }
}
