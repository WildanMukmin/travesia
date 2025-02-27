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

interface DestinasiCardProps {
  src: string;
  judul: string;
  deskripsi: string;
  penulis: string;
}

const DestinasiCard = ({
  src = "",
  judul = "",
  deskripsi = "",
  penulis = "",
}: DestinasiCardProps) => {
  return (
    <Card className="rounded-lg overflow-hidden hover:-translate-y-2 transition cursor-pointer">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image src={src} alt={judul} fill className="object-cover" />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <CardDescription>{penulis}</CardDescription>
        <CardTitle className="text-xl font-bold mt-1">{judul}</CardTitle>
        <p className="text-sm text-gray-600 mt-1">{deskripsi}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Link href="#" className="text-blue-500">
          Lihat Destinasi
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DestinasiCard;
