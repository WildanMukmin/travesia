// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Search,
  Twitter,
  User,
  Youtube,
} from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      {/* Header */}
      <header className="py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold">
            <div className="flex flex-col">
              <span>TRAVESIA</span>
              <span className="text-[18px] font-semibold text-gray-400">
                Travels Indonesia
              </span>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Search className="h-5 w-5" />
            </Button>

            <Input placeholder="Search" className="w-80" />

            <div className="flex items-center space-x-4">
              <Button variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="ghost">
                <Link href="/register">Register</Link>
              </Button>
              <Button variant="default" className="w-8 h-8 rounded-full">
                <Link href="/profile">
                  <User />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <NavigationMenu className="justify-start border-t border-b py-2 my-2 w-full max-w-full">
        <NavigationMenuList className="space-x-6">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="font-medium font-serif">
                HOME
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/blog" legacyBehavior passHref>
              <NavigationMenuLink className="font-medium font-serif">
                BLOG
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/forum" legacyBehavior passHref>
              <NavigationMenuLink className="font-medium font-serif">
                FORUM
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/destinasi" legacyBehavior passHref>
              <NavigationMenuLink className="font-medium font-serif">
                DESTINASI
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/reservasi" legacyBehavior passHref>
              <NavigationMenuLink className="font-medium font-serif">
                RESERVASI
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/tentang-kami" legacyBehavior passHref>
              <NavigationMenuLink className="font-medium font-serif">
                TENTANG KAMI
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>

        <div className="ml-auto">
          <Link href="/dashboard" className="font-bold">
            Dashboard
          </Link>
        </div>
      </NavigationMenu>

      {/* Main Content */}
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
          <h2 className="text-xl font-bold border-b-2 border-blue-800 pb-2 mb-4">
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
                    nobis labore expedita. Facere, tempora! Aliquam, odio
                    officia?
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
                    nobis labore expedita. Facere, tempora! Aliquam, odio
                    officia?
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
                    nobis labore expedita. Facere, tempora! Aliquam, odio
                    officia?
                  </Link>
                </h3>
                <p className="text-sm mt-2">
                  dibuat oleh : wildan mukmin pada tanggal 26 januari 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-gray-100 py-8 mt-12">
        <div className="max-w-screen-xl mx-auto px-4">
          {/* Footer top section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
            {/* Column 1: Logo and social */}
            <div className="space-y-6">
              <Link href="/" className="text-3xl font-bold">
                <div className="flex flex-col">
                  <span>TRAVESIA</span>
                  <span className="text-[18px] font-semibold text-gray-400">
                    Travels Indonesia
                  </span>
                </div>
              </Link>

              <div className="space-y-4">
                <p className="font-medium">Ikuti Kami</p>
                <div className="flex space-x-6">
                  <Link
                    href="https://instagram.com/wildan_mukmin"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </Link>
                  <Link href="https://facebook.com" aria-label="Facebook">
                    <Facebook size={20} />
                  </Link>
                  <Link href="https://twitter.com" aria-label="Twitter">
                    <Twitter size={20} />
                  </Link>
                  <Link href="https://tiktok.com" aria-label="TikTok">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="flex flex-col space-y-4 font-semibold text-gray-600">
              <h1 className="font-bold text-black">Dibuat Oleh :</h1>
              <p>Developers : Wildan Mukmin</p>
              <p>Designers : Bungaran Natanael</p>
              <p>Sistem Analist : Febrina Aulia Azahra</p>
            </div>

            {/* Column 3: Additional Links and Trustmark */}
            <div className="flex flex-col space-y-4">
              <Link href="/pusat-bantuan" className="font-normal font">
                Pusat Bantuan
              </Link>
              <Link href="/tentang-kami" className="font-normal font">
                Tentang Kami
              </Link>
              <Link href="/kontak" className="font-normal font">
                Kontak
              </Link>
              <Link href="/media-sosial" className="font-normal font">
                Media Sosial
              </Link>
              <Link href="/kententuan-layanan" className="font-normal font">
                Ketentuan Layanan
              </Link>
              <Link href="/kebijakan-privasi" className="font-normal font">
                Kebijakan Privasi
              </Link>
            </div>
          </div>

          {/* Divider line */}
          <div className="border-t border-gray-300 my-6"></div>

          {/* Copyright section */}
          <div className="text-center text-sm text-gray-600">
            <p>
              Pariwisata - Travesia adalah sistem digital yang dirancang untuk
              menghubungkan para pecinta petualangan alam dengan destinasi,
              komunitas, event, dan perlengkapan terbaik, sekaligus menyediakan
              platform untuk berbagi pengalaman, dan tips. @2025 Travesia. All
              rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
