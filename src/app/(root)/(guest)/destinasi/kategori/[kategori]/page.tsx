import DestinasiKategoriPage from "@/components/destinasi/destinasi-kategori";

interface PageProps {
  params: Promise<{
    kategori: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { kategori } = await params;

  return <DestinasiKategoriPage kategori={kategori} />;
}
