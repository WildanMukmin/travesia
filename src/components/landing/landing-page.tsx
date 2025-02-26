import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";

const LandingPage = () => {
  return (
    <main className="flex-wrap">
      {/* Featured Image with Category and Title */}
      <div className="flex flex-col items-center my-8">
        <div className="relative w-full h-96">
          <Image
            src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
            alt="Scenic mountain road with view"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="w-full text-center mt-4 mb-8">
          <Link href="#" className="text-blue-800 font-medium tracking-wider">
            Kategori
          </Link>

          <div className="flex items-center justify-center mt-4">
            <Link href="/prev-article" className="text-blue-800 mr-4">
              <ChevronLeft size={24} />
            </Link>

            <h1 className="text-6xl font-serif text-center max-w-3xl">
              Scenic mountain road with view
            </h1>

            <Link href="/next-article" className="text-blue-800 ml-4">
              <ChevronRight size={24} />
            </Link>
          </div>

          <div className="mt-4 text-sm">
            By{" "}
            <Link href="#" className="text-blue-800">
              Wildan Mukmin
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Articles Section */}
      <div className="mt-8">
        <h2 className="text-3xl font-bold border-b-2 border-blue-800 pb-2 mb-4">
          Blog Terkini
        </h2>

        <div className="space-y-6">
          {/* Article 1 */}
          <div className="flex items-start gap-4">
            <div className="w-[400px] h-[300px] relative">
              <Image
                src="https://images.unsplash.com/photo-1724271362937-391a150db603?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
                alt="Floating bungalow"
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <Link href="/hotels-resorts">
                <h1 className="text-2xl font-bold">Judul</h1>
              </Link>
              <h3 className="text-lg font-thin mt-1">
                <Link href="/article/floating-bungalows">
                  Deskripsi Singkat Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Sunt animi cumque aut voluptatum, maiores
                  odit nostrum neque fuga itaque ipsam inventore perspiciatis
                  nobis labore expedita. Facere, tempora! Aliquam, odio officia?
                </Link>
              </h3>
              <p className="text-sm mt-2">
                dibuat oleh : wildan mukmin pada tanggal 26 januari 2025
              </p>
            </div>
          </div>
          {/* Article 1 */}
          <div className="flex items-start gap-4">
            <div className="w-[400px] h-[300px] relative">
              <Image
                src="https://images.unsplash.com/photo-1724271362937-391a150db603?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
                alt="Floating bungalow"
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <Link href="/hotels-resorts">
                <h1 className="text-2xl font-bold">Judul</h1>
              </Link>
              <h3 className="text-lg font-thin mt-1">
                <Link href="/article/floating-bungalows">
                  Deskripsi Singkat Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Sunt animi cumque aut voluptatum, maiores
                  odit nostrum neque fuga itaque ipsam inventore perspiciatis
                  nobis labore expedita. Facere, tempora! Aliquam, odio officia?
                </Link>
              </h3>
              <p className="text-sm mt-2">
                dibuat oleh : wildan mukmin pada tanggal 26 januari 2025
              </p>
            </div>
          </div>
          {/* Article 1 */}
          <div className="flex items-start gap-4">
            <div className="w-[400px] h-[300px] relative">
              <Image
                src="https://images.unsplash.com/photo-1724271362937-391a150db603?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
                alt="Floating bungalow"
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <Link href="/hotels-resorts">
                <h1 className="text-2xl font-bold">Judul</h1>
              </Link>
              <h3 className="text-lg font-thin mt-1">
                <Link href="/article/floating-bungalows">
                  Deskripsi Singkat Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Sunt animi cumque aut voluptatum, maiores
                  odit nostrum neque fuga itaque ipsam inventore perspiciatis
                  nobis labore expedita. Facere, tempora! Aliquam, odio officia?
                </Link>
              </h3>
              <p className="text-sm mt-2">
                dibuat oleh : wildan mukmin pada tanggal 26 januari 2025
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-3xl font-bold border-b-2 border-blue-800 pb-2 mb-4">
          Top Destinasi ⭐
        </h2>
        <div className="flex flex-col gap-3 items-center justify-center">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="rounded-3xl w-[350px] hover:-translate-y-2 transition">
                  <CardHeader>
                    <Image
                      src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                      alt="Scenic mountain road with view"
                      width={300}
                      height={400}
                      className="rounded-lg"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Wildan Mukmin</CardDescription>
                    <CardTitle className="text-2xl text-wrap w-full max-w-full font-semibold">
                      Scenic mountain road with view Scenic mountain road with
                      view
                    </CardTitle>
                  </CardContent>
                  <CardFooter>
                    <Link href="#" className="text-sm text-blue-400">
                      Lihat Destinasi
                    </Link>
                  </CardFooter>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="rounded-3xl w-[350px] hover:-translate-y-2 transition">
                  <CardHeader>
                    <Image
                      src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                      alt="Scenic mountain road with view"
                      width={300}
                      height={400}
                      className="rounded-lg"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Wildan Mukmin</CardDescription>
                    <CardTitle className="text-2xl text-wrap w-full max-w-full font-semibold">
                      Scenic mountain road with view Scenic mountain road with
                      view
                    </CardTitle>
                  </CardContent>
                  <CardFooter>
                    <Link href="#" className="text-sm text-blue-400">
                      Lihat Destinasi
                    </Link>
                  </CardFooter>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="rounded-3xl w-[350px] hover:-translate-y-2 transition">
                  <CardHeader>
                    <Image
                      src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                      alt="Scenic mountain road with view"
                      width={300}
                      height={400}
                      className="rounded-lg"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Wildan Mukmin</CardDescription>
                    <CardTitle className="text-2xl text-wrap w-full max-w-full font-semibold">
                      Scenic mountain road with view Scenic mountain road with
                      view
                    </CardTitle>
                  </CardContent>
                  <CardFooter>
                    <Link href="#" className="text-sm text-blue-400">
                      Lihat Destinasi
                    </Link>
                  </CardFooter>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="rounded-3xl w-[350px] hover:-translate-y-2 transition">
                  <CardHeader>
                    <Image
                      src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                      alt="Scenic mountain road with view"
                      width={300}
                      height={400}
                      className="rounded-lg"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Wildan Mukmin</CardDescription>
                    <CardTitle className="text-2xl text-wrap w-full max-w-full font-semibold">
                      Scenic mountain road with view Scenic mountain road with
                      view
                    </CardTitle>
                  </CardContent>
                  <CardFooter>
                    <Link href="#" className="text-sm text-blue-400">
                      Lihat Destinasi
                    </Link>
                  </CardFooter>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="rounded-3xl w-[350px] hover:-translate-y-2 transition">
                  <CardHeader>
                    <Image
                      src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                      alt="Scenic mountain road with view"
                      width={300}
                      height={400}
                      className="rounded-lg"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Wildan Mukmin</CardDescription>
                    <CardTitle className="text-2xl text-wrap w-full max-w-full font-semibold">
                      Scenic mountain road with view Scenic mountain road with
                      view
                    </CardTitle>
                  </CardContent>
                  <CardFooter>
                    <Link href="#" className="text-sm text-blue-400">
                      Lihat Destinasi
                    </Link>
                  </CardFooter>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="rounded-3xl w-[350px] hover:-translate-y-2 transition">
                  <CardHeader>
                    <Image
                      src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                      alt="Scenic mountain road with view"
                      width={300}
                      height={400}
                      className="rounded-lg"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Wildan Mukmin</CardDescription>
                    <CardTitle className="text-2xl text-wrap w-full max-w-full font-semibold">
                      Scenic mountain road with view Scenic mountain road with
                      view
                    </CardTitle>
                  </CardContent>
                  <CardFooter>
                    <Link href="#" className="text-sm text-blue-400">
                      Lihat Destinasi
                    </Link>
                  </CardFooter>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="rounded-3xl w-[350px] hover:-translate-y-2 transition">
                  <CardHeader>
                    <Image
                      src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                      alt="Scenic mountain road with view"
                      width={300}
                      height={400}
                      className="rounded-lg"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Wildan Mukmin</CardDescription>
                    <CardTitle className="text-2xl text-wrap w-full max-w-full font-semibold">
                      Scenic mountain road with view Scenic mountain road with
                      view
                    </CardTitle>
                  </CardContent>
                  <CardFooter>
                    <Link href="#" className="text-sm text-blue-400">
                      Lihat Destinasi
                    </Link>
                  </CardFooter>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <Button className="mt-5 px-8">
            <Link href="#">Lihat Semua</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
