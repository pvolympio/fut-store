import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={id}
            className="font-mono text-caption uppercase tracking-[0.08em] text-chalk-dim"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={cn(
            "h-12 w-full rounded bg-surface border border-border px-4 text-body text-chalk placeholder:text-chalk-dim/60",
            "transition-colors duration-snap ease-sprint",
            "hover:border-chalk/40",
            "focus-visible:outline-none focus-visible:border-flood focus-visible:ring-1 focus-visible:ring-flood",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
        {hint && <span className="text-caption text-chalk-dim">{hint}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";
