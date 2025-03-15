import { getDestinasiByKategori } from "@/actions/destinasi";
import DestinasiKategoriPage from "@/components/destinasi/destinasi-kategori";

interface PageProps {
  params: Promise<{
    kategori: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { kategori } = await params;
  const data = await getDestinasiByKategori(kategori.split("-").join(" "));
  return <DestinasiKategoriPage data={data || []} kategori={kategori} />;
}
