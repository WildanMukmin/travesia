import DestinasiDetailPage from "@/components/destinasi/destinasi-detail-page";

interface PageProps {
  params: {
    kategori: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { kategori } = params;

  return <DestinasiDetailPage id={kategori} />;
}
