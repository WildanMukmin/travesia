import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TicketX, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Role } from "@prisma/client";

interface ButtonPengajuanPembatalanTableProps {
  name?: string;
  isLoading: boolean;
  role?: Role;
  typeButton?: string;
  aksi: () => void;
  content: string;
}

const ButtonPengajuanPembatalanTable = ({
  role = Role.MEMBER,
  isLoading = false,
  typeButton = "icon",
  name = "",
  content,
  aksi,
}: ButtonPengajuanPembatalanTableProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = () => {
    aksi();
    setIsOpen(false);
  };

  return (
    <TooltipProvider>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              {typeButton === "icon" ? (
                <Button
                  variant="destructive"
                  className="rounded-full w-8 h-8"
                  disabled={isLoading}
                >
                  <TicketX />
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  className="rounded-lg"
                  size="sm"
                  disabled={isLoading}
                >
                  <X />
                  {name}
                </Button>
              )}
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent className="bg-red-500 text-white">
            <p>{content}</p>
          </TooltipContent>
        </Tooltip>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Pembatalan</AlertDialogTitle>
            {role === Role.MEMBER ? (
              <AlertDialogDescription>
                Apakah Anda yakin ingin mengajukan pembatalan reservasi ini?
                Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            ) : (
              <AlertDialogDescription>
                Apakah Anda yakin ingin menerima pembatalan reservasi ini?
                Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                onClick={handleAction}
                className="bg-red-600 text-white"
              >
                {role === Role.MEMBER ? "Ya, Ajukan" : "Terima"}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
};

export default ButtonPengajuanPembatalanTable;
