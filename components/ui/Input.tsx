import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
}

export default function Input({ label, error, hint, leftIcon, className, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-warm-700">
          {label}
          {props.required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-400">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            "w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm text-warm-900",
            "placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-sage-300",
            "focus:border-sage-400 transition-colors duration-150",
            leftIcon && "pl-10",
            error
              ? "border-red-300 focus:ring-red-200"
              : "border-warm-200",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-warm-400">{hint}</p>}
    </div>
  );
}
