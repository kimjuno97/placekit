import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import {
  descriptionStyle,
  fieldRoot,
  inputStyle,
  labelStyle,
} from "./TextField.css";

export type TextFieldProps = {
  label: string;
  helperText?: string;
  errorMessage?: string;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

export function TextField({
  id,
  label,
  helperText,
  errorMessage,
  size = "medium",
  fullWidth = false,
  className,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId =
    errorMessage || helperText ? `${inputId}-description` : undefined;
  const hasError = Boolean(errorMessage);
  const rootClassName = fieldRoot({ fullWidth });

  return (
    <div className={className ? `${rootClassName} ${className}` : rootClassName}>
      <label className={labelStyle} htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={inputStyle({ size, tone: hasError ? "error" : "default" })}
        aria-invalid={hasError || undefined}
        aria-describedby={descriptionId}
        {...props}
      />
      {descriptionId ? (
        <p
          className={descriptionStyle({ tone: hasError ? "error" : "helper" })}
          id={descriptionId}
        >
          {errorMessage ?? helperText}
        </p>
      ) : null}
    </div>
  );
}
