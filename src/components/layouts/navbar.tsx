"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  isLogin: boolean;
}

const Navbar = ({ isLogin }: NavbarProps) => {
  const pathname = usePathname();

  const menuItems = [
    { label: "BERANDA", href: "/" },
    { label: "BLOG", href: "/blog" },
    { label: "DESTINASI", href: "/destinasi" },
    { label: "FORUM", href: "/forum", auth: true },
    { label: "RESERVASI", href: "/reservasi", auth: true },
    { label: "TENTANG KAMI", href: "/tentang-kami" },
  ];

  const getLinkClass = (href: string) => {
    const isActive = pathname === href || pathname.startsWith(href + "/");
    return `font-normal hover:underline ${
      isActive ? "text-[#1e40af] font-semibold" : ""
    }`;
  };

  return (
    <NavigationMenu className="justify-start border-t border-b py-2 my-2 w-full max-w-full">
      <NavigationMenuList className="space-x-6">
        {menuItems.map(({ label, href, auth }) => {
          if (auth && !isLogin) return null;
          return (
            <NavigationMenuItem key={href}>
              <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink className={getLinkClass(href)}>
                  {label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>

      {isLogin && (
        <div className="ml-auto">
          <Button
            variant="default"
            className="bg-[#0B63F2] rounded-lg hover:bg[#1e40af]"
          >
            <Link
              href="/dashboard"
              className={`font-bold flex items-center gap-2 text-white`}
            >
              <HomeIcon />
              Ringkasan
            </Link>
          </Button>
        </div>
      )}
    </NavigationMenu>
  );
};

export default Navbar;
