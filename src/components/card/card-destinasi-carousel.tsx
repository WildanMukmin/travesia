import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface DestinasiCardCarouselProps {
  src: string;
  judul: string;
  id: string;
  deskripsi: string;
  penulis: string;
}

const DestinasiCardCarousel = ({
  src = "",
  judul = "",
  id = "",
  deskripsi = "",
  penulis = "",
}: DestinasiCardCarouselProps) => {
  return (
    <Card className="rounded-3xl w-[400px] hover:-translate-y-2 transition">
      <CardHeader>
        <Image
          src={src as string}
          alt={judul as string}
          width={350}
          height={450}
          className="rounded-lg"
        />
      </CardHeader>
      <CardContent>
        <CardDescription>{penulis}</CardDescription>
        <CardTitle className="text-2xl text-wrap w-full max-w-full font-semibold">
          {judul}
        </CardTitle>
        <p className="text-xs font-normal text-gray-500">{deskripsi}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/destinasi/${id}`} className="text-sm text-blue-400">
          Lihat Destinasi
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DestinasiCardCarousel;
