import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CardDestinasiProps {
  src: string;
  judul: string;
  slug: string;
  deskripsi: string;
  penulis: string;
}

const CardDestinasi = ({
  src = "",
  judul = "",
  slug = "",
  deskripsi = "",
  penulis = "",
}: CardDestinasiProps) => {
  return (
    <div className="flex items-start gap-4">
      <div className="w-[900px] h-[300px] relative">
        <Image
          src={src}
          alt="Floating bungalow"
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="flex flex-col w-full h-[300px]">
        <Link href={`/blog/${slug}`}>
          <h1 className="text-2xl font-bold">{judul}</h1>
        </Link>
        <h3 className="text-lg font-thin mt-1">
          <Link href={`/blog/${slug}`}>{deskripsi}</Link>
        </h3>
        <p className="text-sm mt-2 items-end justify-end mb-auto">
          dibuat oleh : {penulis}
        </p>
        <Button className="max-w-xs justify-start" variant="link">
          <Link href={`/blog/${slug}`}>Lihat Selengkapnya</Link>
        </Button>
      </div>
    </div>
  );
};

export default CardDestinasi;
