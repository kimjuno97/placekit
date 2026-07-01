import type { HTMLAttributes, ReactNode } from "react";
import { badgeStyle } from "./Badge.css";

export type BadgeProps = {
  children: ReactNode;
  variant?: "neutral" | "info" | "success" | "warning" | "danger" | "outline";
  size?: "small" | "medium" | "large";
} & HTMLAttributes<HTMLSpanElement>;

export function Badge({
  children,
  className,
  size = "medium",
  variant = "neutral",
  ...props
}: BadgeProps) {
  const badgeClassName = badgeStyle({ size, variant });

  return (
    <span
      className={className ? `${badgeClassName} ${className}` : badgeClassName}
      {...props}
    >
      {children}
    </span>
  );
}
