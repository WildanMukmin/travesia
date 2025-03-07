import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface ButtonDetailTableProps {
  name: string;
  content: string;
  aksi: () => void;
}

const ButtonDetailTable = ({
  name = "",
  content,
  aksi,
}: ButtonDetailTableProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="rounded-full w-8 h-8" onClick={aksi}>
            <Info />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ButtonDetailTable;
