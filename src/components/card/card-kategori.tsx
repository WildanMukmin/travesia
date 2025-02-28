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

interface DestinasiKategoriCardProps {
  src: string;
  //   id: string;
  kategori: string;
}

const DestinasiKategoriCard = ({
  src = "",
  //   id = "",
  kategori = "",
}: DestinasiKategoriCardProps) => {
  return (
    <Link href={`/kategori/${kategori.toLowerCase()}`}>
      <Card className="rounded-lg overflow-hidden hover:-translate-y-2 transition">
        <CardHeader className="p-0  overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-48 w-40">
            <Image
              src={src}
              alt={kategori}
              fill
              className="object-cover brightness-75 hover:brightness-100 transition-all duration-300"
            />
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-1 rounded-lg hover:text-white">
              <p className="text-lg font-semibold text-white opacity-70">
                {kategori}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default DestinasiKategoriCard;
