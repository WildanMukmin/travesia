import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";

interface ButtonDeleteTableProps {
  name: string;
  aksi: () => void;
  content: string;
}

const ButtonDeleteTable = ({
  name = "",
  content,
  aksi,
}: ButtonDeleteTableProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={aksi}
            variant="destructive"
            className="rounded-full w-8 h-8"
          >
            <Trash2 />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-red-500 text-white">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ButtonDeleteTable;
