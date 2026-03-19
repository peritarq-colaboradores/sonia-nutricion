import { cn } from "@/lib/utils";

type BadgeVariant = "sage" | "terra" | "warm" | "blue" | "red" | "yellow" | "purple";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  sage:   "bg-sage-100 text-sage-700",
  terra:  "bg-terra-100 text-terra-700",
  warm:   "bg-warm-100 text-warm-600",
  blue:   "bg-blue-50 text-blue-700",
  red:    "bg-red-50 text-red-700",
  yellow: "bg-yellow-50 text-yellow-700",
  purple: "bg-purple-50 text-purple-700",
};

export default function Badge({ children, variant = "warm", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
