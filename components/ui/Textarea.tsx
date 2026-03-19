import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export default function Textarea({ label, error, hint, className, id, ...props }: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-warm-700">
          {label}
          {props.required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        id={inputId}
        className={cn(
          "w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm text-warm-900",
          "placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-sage-300",
          "focus:border-sage-400 transition-colors duration-150 resize-none",
          error ? "border-red-300 focus:ring-red-200" : "border-warm-200",
          className
        )}
        rows={props.rows ?? 3}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-warm-400">{hint}</p>}
    </div>
  );
}
