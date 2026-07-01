import type { HTMLAttributes, ReactNode } from "react";
import {
  actionStyle,
  codeStyle,
  descriptionStyle,
  errorStateStyle,
  iconStyle,
  titleStyle,
} from "./ErrorState.css";

type ErrorStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  code?: string;
  icon?: ReactNode;
  severity?: "warning" | "error";
  size?: "compact" | "medium" | "spacious";
} & HTMLAttributes<HTMLDivElement>;

export function ErrorState({
  title,
  description,
  action,
  code,
  icon = "!",
  severity = "error",
  size = "medium",
  className,
  ...props
}: ErrorStateProps) {
  const rootClassName = errorStateStyle({ severity, size });

  return (
    <div
      className={className ? `${rootClassName} ${className}` : rootClassName}
      role={severity === "error" ? "alert" : "status"}
      {...props}
    >
      <div aria-hidden="true" className={iconStyle({ severity })}>
        {icon}
      </div>
      {code ? <div className={codeStyle}>{code}</div> : null}
      <h2 className={titleStyle}>{title}</h2>
      {description ? (
        <p className={descriptionStyle}>{description}</p>
      ) : null}
      {action ? <div className={actionStyle}>{action}</div> : null}
    </div>
  );
}
