import DestinasiDetailPage from "@/components/destinasi/destinasi-detail-page";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <DestinasiDetailPage id={id} />;
}
