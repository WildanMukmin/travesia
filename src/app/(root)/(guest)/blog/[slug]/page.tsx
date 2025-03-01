import BlogDetailPage from "@/components/blog/blog-detail-page";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return <BlogDetailPage slug={slug} />;
}
