import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface SuccessActionFeedbakProps {
  detail: string;
  title: string;
}

const SuccessActionFeedbak = ({ detail, title }: SuccessActionFeedbakProps) => {
  return (
    <Alert variant="default" className="bg-green-200 text-green-800">
      <AlertCircle className="h-4 w-4" color="green" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{detail}</AlertDescription>
    </Alert>
  );
};

export default SuccessActionFeedbak;
