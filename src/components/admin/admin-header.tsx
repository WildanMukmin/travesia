interface AdminHeaderProps {
  headline: string;
  tagline: string;
}

const AdminHeader = ({ headline, tagline }: AdminHeaderProps) => {
  return (
    <div className="mb-4 md:mb-6">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
        {headline}
      </h1>
      <p className="text-sm md:text-base text-muted-foreground">{tagline}</p>
    </div>
  );
};

export default AdminHeader;
