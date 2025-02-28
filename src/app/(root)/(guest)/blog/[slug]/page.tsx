import BlogDetailPage from "@/components/blog/blog-detail-page";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  return <BlogDetailPage slug={slug} />;
}
