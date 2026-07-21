import { cn } from "@/lib/utils";
import { forwardRef, SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, id, children, ...props }, ref) => {
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
        <div className="relative">
          <select
            id={id}
            ref={ref}
            className={cn(
              "h-12 w-full appearance-none rounded bg-surface border border-border px-4 pr-10 text-body text-chalk",
              "transition-colors duration-snap ease-sprint",
              "hover:border-chalk/40",
              "focus-visible:outline-none focus-visible:border-flood focus-visible:ring-1 focus-visible:ring-flood",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-chalk-dim"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";
