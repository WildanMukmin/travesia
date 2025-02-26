import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const DestinasiCard = () => {
  return (
    <Card className="w-full overflow-hidden rounded-lg border shadow-sm hover:-translate-y-1 transition-transform duration-200">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
            alt="Scenic mountain road with view"
            width={300}
            height={400}
            className="rounded-lg"
          />
          {item.category && (
            <div className="absolute top-3 left-3 bg-white/80 px-2 py-1 rounded-md text-xs">
              {item.category}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-xs text-gray-500">
            <span>{item.type}</span>
            <span className="mx-1">•</span>
            <span>{item.location}</span>
          </div>

          <h3 className="font-semibold line-clamp-2 h-12">{item.title}</h3>

          <div className="text-xs">
            <span className="block text-gray-500">Konfirmasi instan</span>
            <div className="flex items-center mt-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-yellow-400 font-medium">
                {item.rating}
              </span>
              <span className="text-gray-500 ml-1">
                ({item.reviewCount.toLocaleString()}) • {item.purchaseInfo}
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col items-start">
        {item.discountedPrice && (
          <div className="flex items-center">
            <span className="text-gray-400 line-through text-sm">
              Rp {item.originalPrice.toLocaleString()}
            </span>
          </div>
        )}

        <div className="flex justify-between w-full">
          <div>
            {item.discountedPrice ? (
              <span className="font-semibold">
                Mulai Rp {item.discountedPrice.toLocaleString()}
              </span>
            ) : (
              <span className="font-semibold">
                Rp {item.price.toLocaleString()}
              </span>
            )}
          </div>

          {item.discount && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              {item.discount}% off
            </span>
          )}
        </div>

        {item.promoTag && (
          <div className="mt-2 border border-orange-300 rounded px-2 py-1 text-xs text-orange-500">
            {item.promoTag}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default DestinasiCard;
