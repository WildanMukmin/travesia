import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TicketX } from "lucide-react";

interface ButtonPengajuanPembatalanTableProps {
  name: string;
  aksi: () => void;
  content: string;
}

const ButtonPengajuanPembatalanTable = ({
  name = "",
  content,
  aksi,
}: ButtonPengajuanPembatalanTableProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={aksi}
            variant="destructive"
            className="rounded-full w-8 h-8"
          >
            <TicketX />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-red-500 text-white">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ButtonPengajuanPembatalanTable;
