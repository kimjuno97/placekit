import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import {
  actionStyle,
  closeButtonStyle,
  contentStyle,
  descriptionStyle,
  titleStyle,
  toastStyle,
  toastViewportStyle,
} from "./Toast.css";

export type ToastProps = {
  open: boolean;
  title: string;
  description?: string;
  variant?: "info" | "success" | "warning" | "error";
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  action?: ReactNode;
  closeLabel?: string;
  duration?: number | null;
  onOpenChange: (open: boolean) => void;
};

export function Toast({
  open,
  title,
  description,
  variant = "info",
  position = "top-center",
  action,
  closeLabel = "알림 닫기",
  duration = 4000,
  onOpenChange,
}: ToastProps) {
  const titleId = useId();
  const descriptionId = useId();
  const role = variant === "error" ? "alert" : "status";

  useEffect(() => {
    if (!open || duration === null) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onOpenChange(false);
    }, duration);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [duration, onOpenChange, open]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className={toastViewportStyle({ position })}>
      <div
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={titleId}
        className={toastStyle({ variant })}
        role={role}
      >
        <div className={contentStyle}>
          <p className={titleStyle} id={titleId}>
            {title}
          </p>
          {description ? (
            <p className={descriptionStyle} id={descriptionId}>
              {description}
            </p>
          ) : null}
          {action ? <div className={actionStyle}>{action}</div> : null}
        </div>
        <button
          aria-label={closeLabel}
          className={closeButtonStyle}
          type="button"
          onClick={() => onOpenChange(false)}
        >
          ×
        </button>
      </div>
    </div>,
    document.body,
  );
}
