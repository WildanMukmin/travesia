import { getDestinasi } from "@/actions/destinasi";
import DestinasiPage from "@/components/destinasi/destinasi-page";

export default async function Page() {
  const destinasi = await getDestinasi();
  if (destinasi) {
    return <DestinasiPage data={destinasi} />;
  }
}
