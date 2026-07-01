import type { HTMLAttributes, ReactNode } from "react";
import {
  actionStyle,
  descriptionStyle,
  emptyStateStyle,
  iconStyle,
  titleStyle,
} from "./EmptyState.css";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  size?: "compact" | "medium" | "spacious";
} & HTMLAttributes<HTMLDivElement>;

export function EmptyState({
  title,
  description,
  action,
  icon = "0",
  size = "medium",
  className,
  ...props
}: EmptyStateProps) {
  const rootClassName = emptyStateStyle({ size });

  return (
    <div
      className={className ? `${rootClassName} ${className}` : rootClassName}
      {...props}
    >
      <div aria-hidden="true" className={iconStyle}>
        {icon}
      </div>
      <h2 className={titleStyle}>{title}</h2>
      {description ? (
        <p className={descriptionStyle}>{description}</p>
      ) : null}
      {action ? <div className={actionStyle}>{action}</div> : null}
    </div>
  );
}
