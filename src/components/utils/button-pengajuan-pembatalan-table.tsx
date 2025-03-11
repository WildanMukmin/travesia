import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TicketX } from "lucide-react";
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

interface ButtonPengajuanPembatalanTableProps {
  name?: string;
  aksi: () => void;
  content: string;
}

const ButtonPengajuanPembatalanTable = ({
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
              <Button variant="destructive" className="rounded-full w-8 h-8">
                <TicketX />
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent className="bg-red-500 text-white">
            <p>{content}</p>
          </TooltipContent>
        </Tooltip>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Pembatalan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin mengajukan pembatalan reservasi ini?
              Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                onClick={handleAction}
                className="bg-red-600 text-white"
              >
                Ya, Ajukan
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
};

export default ButtonPengajuanPembatalanTable;
