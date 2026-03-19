import { cn } from "@/lib/utils";
import type { SelectOption } from "@/types";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
}

export default function Select({
  label,
  error,
  hint,
  options,
  placeholder,
  className,
  id,
  ...props
}: SelectProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-warm-700">
          {label}
          {props.required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}
      <select
        id={inputId}
        className={cn(
          "w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm text-warm-900",
          "focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400",
          "transition-colors duration-150 appearance-none cursor-pointer",
          error ? "border-red-300" : "border-warm-200",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-warm-400">{hint}</p>}
    </div>
  );
}
