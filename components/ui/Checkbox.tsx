"use client";

import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes, useId } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    return (
      <label
        htmlFor={inputId}
        className="group inline-flex items-center gap-3 cursor-pointer select-none"
      >
        <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            id={inputId}
            ref={ref}
            type="checkbox"
            className="peer absolute inset-0 h-5 w-5 cursor-pointer appearance-none rounded-sm border border-border bg-surface transition-colors duration-snap ease-sprint checked:bg-flood checked:border-flood focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-flood focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:opacity-40 disabled:cursor-not-allowed"
            {...props}
          />
          <svg
            className="pointer-events-none relative z-10 hidden h-3 w-3 text-ink peer-checked:block"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M2 6L5 9L10 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {label && (
          <span className="text-body-sm text-chalk-dim group-hover:text-chalk transition-colors duration-snap">
            {label}
          </span>
        )}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
