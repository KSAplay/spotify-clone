import { Card, CardContent } from "@/components/ui/card";

type StatsCardProps = {
  icon: React.ElementType;
  label: string;
  value: string;
  bgColor: string;
  iconColor: string;
};

const StatsCard = ({
  bgColor,
  icon: Icon,
  iconColor,
  label,
  value,
}: StatsCardProps) => {
  return (
    <Card className="flex items-center border-zinc-800/50 bg-zinc-900/50 transition-colors hover:bg-zinc-800/40 md:items-start">
      <CardContent className="p-2 md:p-6">
        <div className="flex items-center gap-4">
          <div className={`rounded-lg p-3 ${bgColor}`}>
            <Icon className={`size-6 ${iconColor}`} />
          </div>
          <div>
            <p className="text-sm text-zinc-400">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
