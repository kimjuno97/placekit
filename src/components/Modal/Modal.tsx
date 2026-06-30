import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import {
  bodyStyle,
  closeButtonStyle,
  descriptionStyle,
  dialogStyle,
  footerStyle,
  headerStyle,
  overlayStyle,
  titleStyle,
} from "./Modal.css";

export type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "small" | "medium" | "large";
  closeLabel?: string;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  onOpenChange: (open: boolean) => void;
};

export function Modal({
  open,
  title,
  description,
  children,
  footer,
  size = "medium",
  closeLabel = "닫기",
  closeOnEscape = true,
  closeOnOverlayClick = true,
  onOpenChange,
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousActiveElement = document.activeElement;
    dialogRef.current?.focus();

    return () => {
      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open || !closeOnEscape) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeOnEscape, onOpenChange, open]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      className={overlayStyle}
      data-testid="modal-overlay"
      onMouseDown={(event) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) {
          onOpenChange(false);
        }
      }}
    >
      <div
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={titleId}
        aria-modal="true"
        className={dialogStyle({ size })}
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <div className={headerStyle}>
          <h2 className={titleStyle} id={titleId}>
            {title}
          </h2>
          <button
            aria-label={closeLabel}
            className={closeButtonStyle}
            type="button"
            onClick={() => onOpenChange(false)}
          >
            ×
          </button>
        </div>
        <div className={bodyStyle}>
          {description ? (
            <p className={descriptionStyle} id={descriptionId}>
              {description}
            </p>
          ) : null}
          {children}
        </div>
        {footer ? <div className={footerStyle}>{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}
