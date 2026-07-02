import type { HTMLAttributes } from "react";
import { spinnerStyle, visuallyHiddenStyle } from "./Spinner.css";

export type SpinnerProps = {
  label?: string;
  size?: "small" | "medium" | "large";
  tone?: "primary" | "neutral" | "inverse";
} & HTMLAttributes<HTMLSpanElement>;

export function Spinner({
  label = "로딩 중",
  size = "medium",
  tone = "primary",
  className,
  ...props
}: SpinnerProps) {
  const spinnerClassName = spinnerStyle({ size, tone });

  return (
    <span aria-label={label} role="status" {...props}>
      <span
        aria-hidden="true"
        className={
          className ? `${spinnerClassName} ${className}` : spinnerClassName
        }
      />
      <span className={visuallyHiddenStyle}>{label}</span>
    </span>
  );
}
