interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  return (
    <main>
      <h1>Blog Detail {slug}</h1>
    </main>
  );
}
