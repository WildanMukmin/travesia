import { getImageById } from "@/actions/image";
import ProfileDropdown from "@/components/profile/profile-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { currentUser } from "@/lib/authenticate";
import { Role } from "@prisma/client";
import { Facebook, HomeIcon, Instagram, Search, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const isLogin = !!user;
  const imageProfile = await getImageById(user?.image?.id || "");
  if (user?.role === Role.ADMIN) {
    return <>{children}</>;
  }
  return (
    <>
      {/* Header */}
      <header className="py-4 max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold">
            <div className="flex flex-col bg-transparent">
              {/* <span>TRAVESIA</span>
                <span className="text-[18px] font-semibold text-gray-400">
                  Travels Indonesia
                </span> */}
              <Image
                src="/travesia-logo-horizontal.png"
                alt="Logo"
                width={300}
                height={100}
              />
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Search className="h-5 w-5" />
            </Button>

            <Input placeholder="Search" className="w-80" />

            <div className="flex items-center space-x-4">
              {!isLogin && (
                <>
                  <Link href="/login">
                    <Button variant="outline">Masuk</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline">Daftar</Button>
                  </Link>
                </>
              )}
              {isLogin && (
                <ProfileDropdown
                  name={user?.name || ""}
                  src={imageProfile?.gambar || ""}
                />
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Navigation */}
        <NavigationMenu className="justify-start border-t border-b py-2 my-2 w-full max-w-full">
          <NavigationMenuList className="space-x-6">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="font-normal hover:underline">
                  BERANDA
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/blog" legacyBehavior passHref>
                <NavigationMenuLink className="font-normal hover:underline">
                  BLOG
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/destinasi" legacyBehavior passHref>
                <NavigationMenuLink className="font-normal hover:underline">
                  DESTINASI
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {isLogin && (
              <NavigationMenuItem>
                <Link href="/forum" legacyBehavior passHref>
                  <NavigationMenuLink className="font-normal hover:underline">
                    FORUM
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}

            {isLogin && (
              <NavigationMenuItem>
                <Link href="/reservasi" legacyBehavior passHref>
                  <NavigationMenuLink className="font-normal hover:underline">
                    RESERVASI
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
            <NavigationMenuItem>
              <Link href="/tentang-kami" legacyBehavior passHref>
                <NavigationMenuLink className="font-normal hover:underline">
                  TENTANG KAMI
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          {isLogin && (
            <div className="ml-auto">
              <Button variant="outline">
                <Link
                  href="/dashboard"
                  className="font-bold flex items-center gap-2"
                >
                  <HomeIcon />
                  DASBOR
                </Link>
              </Button>
            </div>
          )}
        </NavigationMenu>
        {children}
      </div>
      <footer className="w-full bg-gray-100 py-8 mt-12">
        <div className="max-w-screen-xl mx-auto px-4">
          {/* Footer top section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-8">
            {/* Column 1: Logo and social */}
            <div className="space-y-6 ml-6 bg-transparent">
              <Link href="/" className="text-3xl font-bold">
                <div className="flex flex-col">
                  <Image
                    src="/travesia-logo-horizontal.png"
                    alt="Logo"
                    width={260}
                    height={100}
                  />
                </div>
              </Link>

              <div className="space-y-4 flex-col flex items-center justify-center mr-28">
                <p className="font-normal hover:underline">Ikuti Kami</p>
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
            <div className="flex flex-col space-y-4 font-semibold text-gray-600 ml-6">
              <h1 className="font-bold text-black">Dibuat Oleh :</h1>
              <p>Developers : Wildan Mukmin</p>
              <p>Designers : Bungaran Natanael</p>
              <p>Sistem Analist : Febrina Aulia Azahra</p>
              <p>QA : Napis Rizqullah</p>
            </div>

            {/* Column 3: Additional Links and Trustmark */}
            <div className="flex flex-col space-y-4 ml-16">
              <Link
                href="/pusat-bantuan/kelola-akun"
                className="font-normal font"
              >
                Pusat Bantuan
              </Link>
              <Link href="/kontak" className="font-normal font">
                Kontak
              </Link>
              <Link href="/syarat-ketentuan" className="font-normal font">
                Syarat dan Ketentuan
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
              Travesia adalah sistem digital yang dirancang untuk menghubungkan
              para pecinta petualangan alam dengan destinasi, komunitas, event,
              dan perlengkapan terbaik, sekaligus menyediakan platform untuk
              berbagi pengalaman, dan tips. @2025 Travesia. All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
