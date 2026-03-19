import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  trendPositive?: boolean; // true = arriba es positivo, false = arriba es negativo (ej. peso)
  icon?: React.ReactNode;
  color?: "sage" | "terra" | "blue" | "warm";
}

const colorClasses = {
  sage:  { bg: "bg-sage-50",  icon: "text-sage-500",  value: "text-sage-700" },
  terra: { bg: "bg-terra-50", icon: "text-terra-500", value: "text-terra-700" },
  blue:  { bg: "bg-blue-50",  icon: "text-blue-500",  value: "text-blue-700" },
  warm:  { bg: "bg-warm-50",  icon: "text-warm-400",  value: "text-warm-800" },
};

export default function StatCard({
  label,
  value,
  sublabel,
  trend,
  trendValue,
  trendPositive = true,
  icon,
  color = "warm",
}: StatCardProps) {
  const colors = colorClasses[color];

  const trendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const TrendIcon = trendIcon;

  const isPositiveTrend =
    trend === "neutral" ? null :
    (trend === "up" && trendPositive) || (trend === "down" && !trendPositive);

  return (
    <div className="bg-white rounded-2xl border border-warm-100 shadow-card p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-warm-500 font-medium">{label}</p>
        {icon && (
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", colors.bg)}>
            <span className={colors.icon}>{icon}</span>
          </div>
        )}
      </div>
      <p className={cn("text-2xl font-bold", colors.value)}>{value}</p>
      {sublabel && <p className="text-xs text-warm-400 mt-0.5">{sublabel}</p>}
      {trend && trendValue && (
        <div className={cn(
          "flex items-center gap-1 mt-2 text-xs font-medium",
          isPositiveTrend === true ? "text-sage-600" :
          isPositiveTrend === false ? "text-red-500" :
          "text-warm-400"
        )}>
          <TrendIcon className="w-3.5 h-3.5" />
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
}
