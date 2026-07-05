import type { HTMLAttributes } from "react";
import {
  dotDelaySecondStyle,
  dotDelayThirdStyle,
  dotsStyle,
  dotStyle,
  spinnerStyle,
  visuallyHiddenStyle,
} from "./Spinner.css";

export type SpinnerProps = {
  label?: string;
  size?: "small" | "medium" | "large";
  tone?: "primary" | "neutral" | "inverse" | "warning";
  variant?: "ring" | "dots";
} & HTMLAttributes<HTMLSpanElement>;

export function Spinner({
  label = "로딩 중",
  size = "medium",
  tone = "primary",
  variant = "ring",
  className,
  ...props
}: SpinnerProps) {
  const loadingClassName =
    variant === "dots"
      ? dotsStyle({ size })
      : spinnerStyle({ size, tone });
  const dotClassName = dotStyle({ size, tone });

  return (
    <span aria-label={label} role="status" {...props}>
      {variant === "dots" ? (
        <span
          aria-hidden="true"
          className={
            className ? `${loadingClassName} ${className}` : loadingClassName
          }
        >
          <span className={dotClassName} />
          <span className={`${dotClassName} ${dotDelaySecondStyle}`} />
          <span className={`${dotClassName} ${dotDelayThirdStyle}`} />
        </span>
      ) : (
        <span
          aria-hidden="true"
          className={
            className ? `${loadingClassName} ${className}` : loadingClassName
          }
        />
      )}
      <span className={visuallyHiddenStyle}>{label}</span>
    </span>
  );
}
