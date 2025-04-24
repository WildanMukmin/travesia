"use client";

import LogoutButton from "@/components/auth/button-logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import Link from "next/link";

interface ProfileDropdownProps {
  name: string;
  src: string;
}

const ProfileDropdown = ({ name, src }: ProfileDropdownProps) => {
  return (
    <div className="flex flex-col items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full w-8 h-8 flex items-center justify-center text-white">
          <Avatar>
            <AvatarImage src={src} alt="wildan mukmin" />
            <AvatarFallback>
              <User height={25} width={25} className="text-black" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-center">
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile" className="w-full cursor-pointer">
              Profil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <p className="text-sm font-semibold mt-2">{name}</p>
    </div>
  );
};

export default ProfileDropdown;
{
  /* <Button
size="sm"
onClick={() => signOut({ callbackUrl: "/login" })}
className="w-full text-white bg-red-600 cursor-pointer hover:text-red-600 hover:bg-white flex gap-2"
>
<LogOutIcon />
Logout
</Button> */
}
