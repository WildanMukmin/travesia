import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CardBlogProps {
  src: string;
  judul: string;
  slug: string;
  deskripsi: string;
  penulis: string;
}

const CardBlog = ({
  src = "",
  judul = "",
  slug = "",
  deskripsi = "",
  penulis = "",
}: CardBlogProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-6 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="w-full md:w-[400px] h-[250px] relative">
        <Image
          src={src}
          alt={judul}
          fill
          className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
        />
      </div>
      <div className="flex flex-col w-full p-6">
        <Link href={`/blog/${slug}`}>
          <h1 className="text-2xl font-bold hover:underline cursor-pointer">
            {judul}
          </h1>
        </Link>
        <p className="text-lg text-gray-600 mt-2 line-clamp-3">{deskripsi}</p>
        <p className="text-sm text-gray-500 mt-4">{penulis}</p>
        <div className="mt-4">
          <Link href={`/blog/${slug}`}>
            <Button className="">Lihat Selengkapnya</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardBlog;
