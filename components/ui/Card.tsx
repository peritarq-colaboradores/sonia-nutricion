import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  padding?: "sm" | "md" | "lg" | "none";
}

const paddingClasses = {
  sm:   "p-4",
  md:   "p-6",
  lg:   "p-8",
  none: "",
};

export default function Card({ children, className, hover, onClick, padding = "md" }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-warm-100 shadow-card",
        paddingClasses[padding],
        hover && "transition-shadow duration-200 hover:shadow-card-hover cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Variante con sección de cabecera
interface CardHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
}

export function CardHeader({ title, subtitle, actions, icon }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3 mb-5">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-9 h-9 rounded-xl bg-sage-50 flex items-center justify-center text-sage-500">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-semibold text-warm-900 text-base">{title}</h3>
          {subtitle && <p className="text-xs text-warm-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
