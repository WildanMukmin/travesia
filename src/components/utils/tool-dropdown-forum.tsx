"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { startTransition, useState } from "react";

interface ToolDropdownForumProps {
  forumId: string;
  onDelete: () => void;
  admin?: boolean;
}

const ToolDropdownForum = ({
  forumId,
  onDelete,
  admin,
}: ToolDropdownForumProps) => {
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleAction = () => {
    onDelete();
    setIsOpen(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full ml-2"
        >
          <MoreVertical className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-3">
        <DropdownMenuItem asChild>
          {admin ? (
            <Button className="w-full cursor-pointer rounded-lg" asChild>
              <Link href={`/admin/kelola-forum/edit/${forumId}`}>Ubah</Link>
            </Button>
          ) : (
            <Button className="w-full cursor-pointer rounded-lg" asChild>
              <Link href={`/forum/edit-forum/${forumId}`}>Ubah</Link>
            </Button>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button
                className="w-full cursor-pointer rounded-lg"
                variant="destructive"
              >
                Hapus
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Apakah anda yakin ingin menghapus?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Tindakan ini akan menghapus postingan forum secara permanen!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className="w-full text-white bg-gray-600"
                  asChild
                >
                  <Button variant={"default"} disabled={isPending}>
                    {isPending ? "Memuat..." : "Tidak"}
                  </Button>
                </AlertDialogCancel>
                <Button
                  className="w-full text-white bg-red-600 cursor-pointer hover:text-red-600 hover:bg-white flex gap-2"
                  onClick={() => {
                    setIsPending(true);
                    startTransition(() => {
                      handleAction();
                      setIsPending(false);
                    });
                  }}
                  disabled={isPending}
                >
                  {isPending ? "Memuat..." : "Ya"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ToolDropdownForum;
