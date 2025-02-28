import DestinasiDetailPage from "@/components/destinasi/destinasi-detail-page";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;

  return <DestinasiDetailPage id={id} />;
}
