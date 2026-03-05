import * as React from "react";
import { cn } from "@/utils/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-offset-white focus:ring-2 focus:ring-slate-900",
        className,
      )}
      {...props}
    />
  );
}
