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

interface ToolDropdownBlogProps {
  blogId: string;
  admin?: boolean;
  onDelete: () => void;
}

const ToolDropdownBlog = ({
  blogId,
  admin,
  onDelete,
}: ToolDropdownBlogProps) => {
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleAction = () => {
    onDelete();
    setIsOpen(false);
  };

  return (
    <div className="absolute top-4 right-4 bg-gray-200 rounded-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="flex flex-col gap-3">
          <DropdownMenuItem asChild>
            {admin ? (
              <Button className="w-full cursor-pointer rounded-lg" asChild>
                <Link href={`/admin/kelola-blog/edit/${blogId}`}>Edit</Link>
              </Button>
            ) : (
              <Button className="w-full cursor-pointer rounded-lg" asChild>
                <Link href={`/blog/edit-blog/${blogId}`}>Edit</Link>
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
                    Tindakan ini akan menghapus blog secara permanen!
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
    </div>
  );
};

export default ToolDropdownBlog;
