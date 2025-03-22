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
import { LogOutIcon } from "lucide-react";
import { startTransition, useState } from "react";

interface ButtonAlertProps {
  name: string;
  title: string;
  description: string;
  onClick: () => void | Promise<void>;
}

const ButtonAlert = ({
  name,
  title,
  description,
  onClick,
}: ButtonAlertProps) => {
  const [isPending, setIsPending] = useState(false);
  const handleClick = () => {
    setIsPending(true);
    startTransition(() => {
      onClick()?.then(() => {
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
          {name}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
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
          >
            Ya
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ButtonAlert;
