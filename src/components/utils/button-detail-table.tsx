import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import Link from "next/link";

interface ButtonDetailTableProps {
  reservasiId: string;
  name: string;
  content: string;
}

const ButtonDetailTable = ({
  reservasiId = "",
  name = "",
  content,
}: ButtonDetailTableProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={`/reservasi/detail-reservasi?id=${reservasiId}`}>
            <Button className="rounded-full w-8 h-8">
              <Info />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ButtonDetailTable;
