import DestinasiKategoriPage from "@/components/destinasi/destinasi-kategori";

interface PageProps {
  params: {
    kategori: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { kategori } = params;

  return <DestinasiKategoriPage kategori={kategori} />;
}
