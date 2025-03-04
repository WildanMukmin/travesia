"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { startTransition, useState } from "react";
const LogoutButton = () => {
  const [isPending, setIsPending] = useState(false);
  const handleClick = () => {
    setIsPending(true);
    startTransition(() => {
      signOut({ callbackUrl: "/login" }).then(() => {
        setIsPending(false);
      });
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          className="w-full text-white bg-red-600 cursor-pointer hover:text-red-600 hover:bg-white flex gap-2"
        >
          <LogOutIcon />
          Keluar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin ingin keluar?</AlertDialogTitle>
          <AlertDialogDescription>
            Setelah anda keluar, anda akan diarahkan ke halaman login!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full text-white bg-gray-600" asChild>
            <Button variant={"default"} disabled={isPending}>
              {isPending ? "Memuat..." : "Tidak"}
            </Button>
          </AlertDialogCancel>
          <Button
            className="w-full text-white bg-red-600 cursor-pointer hover:text-red-600 hover:bg-white flex gap-2"
            onClick={handleClick}
            disabled={isPending}
          >
            {isPending ? "Memuat..." : "Ya"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutButton;
