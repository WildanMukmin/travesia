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
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

interface LandingPageProps {
  destinasiData: DestinasiWithOwner;
  blogData: BlogWithCreator;
  user: User | null;
}

const LandingPage = ({ destinasiData, blogData, user }: LandingPageProps) => {
  if (user && user.role === Role.ADMIN) {
    redirect("/dashboard");
  }
  const images = [
    {
      src: "https://images.unsplash.com/photo-1569158049406-6dc6f71ccd48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJlYXV0aWZ1bCUyMG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Pemandangan alam Indonesia",
      title: "Dunia Penuh Cerita",
      subtitle:
        "Dari Sabang sampai Merauke, temukan wisata alam dan budaya yang memukau hati",
    },
    {
      src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJlYXV0aWZ1bCUyMG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Pantai tropis di Indonesia",
      title: "Jelajahi Surga Tropis",
      subtitle:
        "Nikmati keindahan pantai di Bali, Lombok, dan pulau-pulau eksotis lainnya",
    },
    {
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmVhdXRpZnVsJTIwbmF0dXJlfGVufDB8fDB8fHww",
      alt: "Pegunungan hijau Indonesia",
      title: "Petualangan Nusantara",
      subtitle:
        "Daki gunung, telusuri hutan, dan rasakan sensasi petualangan di alam Indonesia",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const goToPrevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length,
      );
    }
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  // Reset transition state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <main className="flex-wrap">
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Image Slider with Transition */}
        <div className="absolute inset-0 z-0">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === currentIndex}
              />
            </div>
          ))}
        </div>

        {/* Overlay with improved gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />

        {/* Content */}
        <div className="relative z-20 text-white text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold drop-shadow-lg transition-all duration-500">
            {images[currentIndex].title}
          </h1>
          <p className="mt-4 text-lg sm:text-xl font-light drop-shadow-md transition-all duration-500">
            {images[currentIndex].subtitle}
          </p>

          {/* Improved Search Box */}
          <div className="mt-8 flex justify-center">
            <div className="bg-white/95 backdrop-blur-sm rounded-full p-1 shadow-lg flex w-full max-w-xl items-center transition-all duration-300 hover:shadow-xl">
              <Input
                type="text"
                placeholder="Cari destinasi atau aktivitas"
                className="rounded-full px-6 py-3 border-none focus:outline-none text-gray-800 h-12"
              />
              <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 py-3 h-12 font-medium transition-all duration-300 transform hover:scale-105">
                Cari
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation Arrows */}
        <button
          onClick={goToPrevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 p-3 rounded-full transition-all duration-300 text-white/80 hover:text-white"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={goToNextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 p-3 rounded-full transition-all duration-300 text-white/80 hover:text-white"
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Branding with improved styling */}
        <div className="absolute top-6 left-6 z-30">
          <h2 className="text-2xl font-bold text-white drop-shadow-md">
            Travesia
          </h2>
          <p className="text-sm font-light text-white/90 drop-shadow-sm">
            Jelajahi setiap sudut Indonesia
          </p>
        </div>
      </section>

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
