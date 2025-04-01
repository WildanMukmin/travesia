import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface AdminHeaderProps {
  headline: string;
  tagline: string;
}

const AdminHeader = ({ headline, tagline }: AdminHeaderProps) => {
  return (
    <div className="mb-4 md:mb-6 flex justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {headline}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">{tagline}</p>
      </div>
      <div className="flex flex-col items-center mr-8">
        <Avatar>
          <AvatarImage
            src="https://github.com/wildanmukmin.png"
            alt="wildan mukmin"
          />
          <AvatarFallback>
            <User height={25} width={25} className="text-black" />
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-semibold mt-2">Super Admin</p>
      </div>
    </div>
  );
};

export default AdminHeader;
