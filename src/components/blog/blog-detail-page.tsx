import Image from "next/image";
import Link from "next/link";

interface BlogDetailPageProps {
  slug: string;
}

const BlogDetailPage = ({ slug }: BlogDetailPageProps) => {
  // This would typically be fetched from an API based on the slug
  const blogPost = {
    title: "Scenic mountain road with view",
    author: "Wildan Mukmin",
    image:
      "https://images.unsplash.com/photo-1740514531864-ea9cec02fbac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D", // You'll need to replace this with your actual image path
    content: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem necessitatibus aliquam accusamus provident voluptatem fugiat dolorem illum eveniet voluptatibus excepturi a eius dolor nihil quisquam mollitia esse, inventore amet modi corrupti suscipit neque quaerat quibusdam veniam ipsam. Omnis expedita, laborum eaque distinctio, culpa explicabo tempore consectetur voluptatem impedit vero eveniet.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem necessitatibus aliquam accusamus provident voluptatem fugiat dolorem illum eveniet voluptatibus excepturi a eius dolor nihil quisquam mollitia esse, inventore amet modi corrupti suscipit neque quaerat quibusdam veniam ipsam. Omnis expedita, laborum eaque distinctio, culpa explicabo tempore consectetur voluptatem impedit vero eveniet.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem necessitatibus aliquam accusamus provident voluptatem fugiat dolorem illum eveniet voluptatibus excepturi a eius dolor nihil quisquam mollitia esse, inventore amet modi corrupti suscipit neque quaerat quibusdam veniam ipsam. Omnis expedita, laborum eaque distinctio, culpa explicabo tempore consectetur voluptatem impedit vero eveniet.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem necessitatibus aliquam accusamus provident voluptatem fugiat dolorem illum eveniet voluptatibus excepturi a eius dolor nihil quisquam mollitia esse, inventore amet modi corrupti suscipit neque quaerat quibusdam veniam ipsam. Omnis expedita, laborum eaque distinctio, culpa explicabo tempore consectetur voluptatem impedit vero eveniet.",
    ],
    date: "February 28, 2025",
  };

  return (
    <article className="max-w-full mx-auto px-4 py-8">
      <div className="mb-8 relative h-96 w-full rounded-lg overflow-hidden">
        <Image
          src={blogPost.image}
          alt={blogPost.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <h1 className="text-3xl font-bold mb-4">{blogPost.title}</h1>

      <div className="flex items-center mb-6 text-gray-600">
        <span className="mr-4">
          <time dateTime={blogPost.date}>{blogPost.date}</time>
        </span>
        <span>
          By{" "}
          <Link
            href="/author/wildan-mukmin"
            className="text-blue-600 hover:underline"
          >
            {blogPost.author}
          </Link>
        </span>
      </div>

      {blogPost.content.map((paragraph, index) => (
        <div className="prose max-w-none mb-2 text-lg font-thin" key={index}>
          <p>{paragraph}</p>
        </div>
      ))}

      <div className="mt-12 pt-6 border-t">
        <Link href="/blog" className="text-blue-600 hover:underline">
          ← Back to all posts
        </Link>
      </div>
    </article>
  );
};

export default BlogDetailPage;
