"use client";

import { BlogWithCreator } from "@/actions/blog";
import { DestinasiWithOwner } from "@/actions/destinasi";
import CardBlog from "@/components/card/card-blog";
import DestinasiCard from "@/components/card/card-destinasi-carousel";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Role, User } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface LandingPageProps {
  destinasiData: DestinasiWithOwner;
  blogData: BlogWithCreator;
  user: User | null;
}

const LandingPage = ({ destinasiData, blogData, user }: LandingPageProps) => {
  if (user && user.role === Role.ADMIN) {
    redirect("/dashboard");
  }
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
      <div className="mt-10 flex flex-col">
        <h2 className="text-3xl font-bold border-b-2 border-blue-800 pb-2 mb-4">
          Blog Terkini
        </h2>

        <div className="space-y-6">
          {blogData &&
            blogData
              .slice(0, 3)
              .map((item) => (
                <CardBlog
                  key={item.id}
                  blogId={item?.id}
                  src={
                    item?.image?.gambar ||
                    "https://images.unsplash.com/photo-1724271362937-391a150db603?w=500&auto=format&fit=crop&q=60"
                  }
                  judul={`${item.title}`}
                  slug={`${item.slug}`}
                  deskripsi={item.content[0].slice(0, 100)}
                  penulis={`${item.user.name} pada ${item.createdAt.toLocaleDateString()}`}
                />
              ))}
          {blogData && blogData.length === 0 && (
            <p className="text-center">Belum ada Postingan</p>
          )}
        </div>
        <div className="w-full flex items-center justify-center">
          <Link href="/blog">
            <Button className="mt-5 px-8 justify-center max-w-sm items-center">
              Lihat Semua
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Destinasi */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold border-b-2 border-blue-800 pb-2 mb-4">
          Top Destinasi ⭐
        </h2>
        <div className="flex flex-col gap-3 items-center justify-center">
          {destinasiData && destinasiData.length < 1 ? (
            <div>Belum Ada Destinasi Tersedia</div>
          ) : (
            <>
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full"
              >
                <CarouselContent>
                  {destinasiData &&
                    destinasiData.map((item) => (
                      <CarouselItem
                        className="md:basis-1/2 lg:basis-1/3"
                        key={item.id}
                      >
                        <DestinasiCard
                          src={
                            item?.image?.gambar ||
                            "https://images.unsplash.com/photo-1724271362937-391a150db603?w=500&auto=format&fit=crop&q=60"
                          }
                          judul={
                            item.namaDestinasi.length <= 30
                              ? item.namaDestinasi
                              : `${item.namaDestinasi.slice(0, 30)} ...`
                          }
                          id={item.id}
                          deskripsi={`${item.deskripsi.slice(0, 100)}......`}
                        />
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <Link href="/destinasi">
                <Button className="mt-5 px-8">Lihat Semua</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
