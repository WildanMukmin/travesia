"use client";

import { Button } from "@/components/ui/button";
import ToolDropdown from "@/components/utils/tool-dropdown-blog";
import Image from "next/image";
import Link from "next/link";

interface CardBlogProps {
  blogId: string;
  creatorId?: string;
  userId?: string;
  src: string;
  judul: string;
  slug: string;
  deskripsi: string;
  penulis: string;
  onDelete?: () => void;
}

const CardBlog = ({
  blogId = "",
  creatorId = "",
  userId = "",
  src = "",
  judul = "",
  slug = "",
  deskripsi = "",
  penulis = "",
  onDelete,
}: CardBlogProps) => {
  return (
    <div className="relative flex flex-col md:flex-row items-start gap-6 bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Dropdown di pojok kanan atas */}
      {creatorId === userId && onDelete && (
        <ToolDropdown blogId={blogId} onDelete={onDelete} />
      )}
      <div className="w-full md:w-[400px] h-[250px] relative">
        <Image
          src={src}
          alt={judul}
          fill
          className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
        />
      </div>
      <div className="flex flex-col w-1/2 p-6">
        <Link href={`/blog/detail/${slug}?id=${blogId}`}>
          <h1 className="text-2xl font-bold hover:underline cursor-pointer">
            {judul}
          </h1>
        </Link>
        <p className="text-lg text-gray-600 mt-2 line-clamp-3">{deskripsi}</p>
        <p className="text-sm text-gray-500 mt-4">{penulis}</p>
        <div className="mt-4 flex items-center gap-4">
          <Link href={`/blog/detail/${slug}?id=${blogId}`}>
            <Button className="">Lihat Selengkapnya</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardBlog;
