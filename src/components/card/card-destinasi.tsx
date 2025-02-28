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
import { Button } from "../ui/button";
import { Bookmark, Share2 } from "lucide-react";

interface DestinasiCardProps {
  src: string;
  judul: string;
  id: string;
  deskripsi: string;
  kategori: string;
  penulis: string;
}

const DestinasiCard = ({
  src = "",
  judul = "",
  id = "",
  deskripsi = "",
  kategori = "",
  penulis = "",
}: DestinasiCardProps) => {
  return (
    <Card className="rounded-lg overflow-hidden hover:-translate-y-2 transition">
      <CardHeader className="p-0  overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 w-full">
          <Image
            src={src}
            alt={judul}
            fill
            className="object-cover brightness-75 hover:brightness-100 transition-all duration-300"
          />
          <div className="absolute top-4 left-4 bg-white bg-opacity-75 backdrop-blur-sm px-4 py-1 rounded-lg">
            <p className="text-lg font-semibold text-gray-800">{kategori}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <CardDescription>{penulis}</CardDescription>
        <CardTitle className="text-xl font-bold mt-1">{judul}</CardTitle>
        <p className="text-sm text-gray-600 mt-1">{deskripsi}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Link href={`/destinasi/${id}`} className="text-blue-500">
          Lihat Destinasi
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DestinasiCard;
