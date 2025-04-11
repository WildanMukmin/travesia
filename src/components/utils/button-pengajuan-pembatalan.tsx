"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Role } from "@prisma/client";
import { TicketX, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface ButtonPengajuanPembatalanTableProps {
  name?: string;
  isLoading: boolean;
  role?: Role;
  typeButton?: string;
  aksi: (value?: string) => void; // sekarang aksi menerima value
  content: string;
}

const schema = z.object({
  alasan: z.string().min(1, "Pilih alasan terlebih dahulu"),
});

const ButtonPengajuanPembatalanTable = ({
  role = Role.MEMBER,
  isLoading = false,
  typeButton = "icon",
  name = "",
  content,
  aksi,
}: ButtonPengajuanPembatalanTableProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      alasan: "",
    },
  });

  const alasanList = [
    "Ingin mengganti tanggal",
    "Stok habis",
    "Tejadi bencana alam",
    "Lainnya",
  ];

  const handleSubmit = (data: { alasan: string }) => {
    aksi(data.alasan);
    setIsOpen(false);
  };

  const handleAction = () => {
    aksi();
    setIsOpen(false);
  };

  if (role === Role.MEMBER) {
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
            <Form {...form}>
              <AlertDialogHeader>
                <AlertDialogTitle>Konfirmasi Pembatalan</AlertDialogTitle>
                <AlertDialogDescription>
                  {role === Role.MEMBER
                    ? "Apakah Anda yakin ingin mengajukan pembatalan reservasi ini? Tindakan ini tidak dapat dibatalkan."
                    : "Apakah Anda yakin ingin menerima pembatalan reservasi ini? Tindakan ini tidak dapat dibatalkan."}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="alasan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alasan Pembatalan</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih alasan pembatalan" />
                        </SelectTrigger>
                        <SelectContent>
                          {alasanList.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <Button
                    type="submit"
                    variant="destructive"
                    className="bg-red-600 text-white"
                  >
                    {role === Role.MEMBER ? "Ya, Ajukan" : "Terima"}
                  </Button>
                </AlertDialogFooter>
              </form>
            </Form>
          </AlertDialogContent>
        </AlertDialog>
      </TooltipProvider>
    );
  }
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
            <AlertDialogDescription>
              Apakah Anda yakin ingin menerima pembatalan reservasi ini?
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
                Terima
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
};

export default ButtonPengajuanPembatalanTable;
