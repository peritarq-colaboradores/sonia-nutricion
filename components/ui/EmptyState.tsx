import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-14 text-center", className)}>
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-warm-100 flex items-center justify-center mb-4 text-warm-400">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-warm-700 mb-1">{title}</h3>
      {description && <p className="text-sm text-warm-400 max-w-sm mb-5">{description}</p>}
      {action}
    </div>
  );
}
